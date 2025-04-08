import {
    Avatar,
    Box, Chip, CircularProgress, IconButton, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useMemo, useState} from "react";
import * as fns from 'date-fns';
import {ru} from 'date-fns/locale';
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../../enums/routes";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterListIcon from '@mui/icons-material/FilterList';
import {StatusPopover} from "./components/StatusPopover.tsx";
import {getChipFontColor, getChipStatusColor} from "./utils.ts";
import {useQuery} from "react-query";
import {EventsApi} from "../../../api/events";
import {EventData} from "../../../types/events";
import {DecodedJwt} from "../../../utils/jwt/DecodedJwt.tsx";
import {Role} from "../../../enums/roles";

export const Events = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dateSort, setDateSort] = useState('ASC')
    const nav = useNavigate()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const role = DecodedJwt()?.role;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { data: events, isLoading } = useQuery(
        ['events', page, rowsPerPage],
        () => EventsApi.get({page: page + 1, take: rowsPerPage}),
        { refetchOnWindowFocus: false }
    );

    const columns = useMemo(() => {
        return [{id: 'title', name: 'Название', sorting: false, filter: false}, {
            id: 'theme_id',
            name: 'Тема',
            sorting: false,
            filter: false
        }, {
            id: 'date',
            name: 'Дата и время', sorting: true, filter: false
        }, {id: 'events_managers', name: 'Ответственный', sorting: false, filter: false}, {
            id: 'status',
            name: 'Статус',
            sorting: false,
            filter: true
        }]
    }, [])

    const themeOptions = useMemo(() => {
        return [
            {label: 'Слет', value: '0111a2d3-d3e6-11ef-aa2a-50ebf6992398'},
            {label: 'Квиз', value: '94a1eb6c-d3e0-11ef-aa2a-50ebf6992398'},
            {label: 'Квест', value: 'a15ad887-d3e0-11ef-aa2a-50ebf6992398'},
            {label: 'Знакомка', value: 'ac4cf8f7-d3e0-11ef-aa2a-50ebf6992398'},
        ]
    }, [])

    return (
        <Box className={'content'} sx={{marginInline: '150px'}}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px'
            }}>
                <TextField label={'Поиск мероприятия'} size={'small'} sx={{width: '340px'}} InputProps={{
                    startAdornment:
                        <InputAdornment position='start'>
                            <SearchIcon/>
                        </InputAdornment>
                }}/>
                { role !== Role.Old && <Button size={'small'} variant={'contained'} color={'primary'} sx={{width: '210px'}}
                         onClick={() => nav(RoutesName.AddEvent)}>Создать
                    мероприятие</Button>}
            </Box>
            {isLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                <TableContainer sx={{minWidth: '1024'}}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={'center'}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            cursor: 'pointer',
                                            alignItems: 'center'
                                        }}>

                                            <Typography variant={'subtitle2'}>{column.name}</Typography>
                                            {column.sorting && (<IconButton
                                                    onClick={() => setDateSort(dateSort === 'ASC' ? 'DESK' : 'ASC')}>
                                                    {dateSort === 'ASC' ? <ArrowDownwardIcon color={'action'}/> :
                                                        <ArrowUpwardIcon color={'action'}/>}
                                                </IconButton>

                                            )}
                                            {column.filter && <Box sx={{position: 'relative'}}>
                                                <IconButton onClick={handleClick}>
                                                    <FilterListIcon color={'action'} fontSize={'small'}/>
                                                </IconButton>
                                                <StatusPopover open={open} anchorEl={anchorEl}
                                                               setAnchorEl={setAnchorEl}/>
                                            </Box>}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events?.data?.data
                                .map((row: EventData) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name} sx={{
                                            "& .MuiTableRow-root:hover": {
                                                backgroundColor: "primary.light"
                                            },
                                        }}>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    cursor: 'pointer'
                                                }} onClick={() => nav(`${RoutesName.Event}${row.id}`)}>
                                                    <Typography
                                                        variant={'subtitle1'}>{row.name}</Typography>
                                                    <OpenInNewIcon fontSize={'small'}/>
                                                </Box>
                                            </TableCell>
                                            <TableCell><Typography
                                                variant={'subtitle1'}>{themeOptions.filter(theme => theme.value === row.theme_id)[0].label}</Typography></TableCell>
                                            <TableCell align={'left'}><Typography
                                                variant={'subtitle1'}>{fns.format(row.date, 'd.LL.yyyy HH:mm', {locale: ru})}</Typography></TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: '4px',
                                                    flexWrap: 'wrap',
                                                    maxWidth: '130px'
                                                }}>
                                                    {
                                                        row.managers.map(user => {
                                                            const label = user.name.split(' ')[0] + ' ' + user.name.split(' ')[1].split('')[0] + '.'
                                                            return <Chip label={label}
                                                                         avatar={<Avatar>{"ОР"}</Avatar>}
                                                                         variant={'outlined'} size={'small'}
                                                            />
                                                        })
                                                    }
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={row.is_archived ? 'Архив': 'В работе'} sx={{
                                                    backgroundColor: getChipStatusColor(row.is_archived ? 'Архив': 'В работе'),
                                                    color: getChipFontColor(row.is_archived  ? 'Архив': 'В работе')
                                                }}
                                                      size={'small'}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                        ;
                                })}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, 100]}
                    count={events?.data?.meta.itemCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={'Количество строк на странице'}
                    labelDisplayedRows={
                        ({from, to, count}) => {
                            return '' + from + '-' + to + ' из ' + count
                        }
                    }
                />
            </Box>}
        </Box>
    )
}
