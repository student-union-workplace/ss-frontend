import {useQuery} from "react-query";
import {EventsApi} from "../../../../api/events";
import Tab from '@mui/material/Tab';
import Tabs from "@mui/material/Tabs";
import {SyntheticEvent, useState} from "react";
import {
    Box,
    Chip, Collapse, Divider,
    Table,
    TableBody,
    TableCell, TableContainer,

    TableRow,
    Typography
} from "@mui/material";
import {EventData} from "../../../../types/events";
import {RoutesName} from "../../../../enums/routes";
import * as fns from "date-fns";
import {ru} from "date-fns/locale";
import {useNavigate, useParams} from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Events = () => {
    const [value, setValue] = useState<string>('current');
    const [open] = useState(true);
    const nav = useNavigate();
    const params = useParams();
    const id = params.id;
    console.log(id);

    const handleChange = (_: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        console.log(newValue);
    };

    const {data: events, isLoading: isLoadingEvents} = useQuery(
        ['events', value],
        () => EventsApi.get({page: 1, take: 10000, filters: {isArchived: value === 'archived'}}),
        {refetchOnWindowFocus: false}
    );

    console.log(events, isLoadingEvents);

    return(<Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%'}}>
            <Divider orientation="horizontal" variant="fullWidth" flexItem
                     sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginInline: '1rem'}}/>
            <Box sx={{width:'100%'}}>
                <Typography sx={{textAlign: 'center', paddingBottom: '1rem'}} variant={'h5'}>Мои мероприятия</Typography>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Текущие мероприятия" value='current'/>
                    <Tab label="Прошедшие мероприятия" value='archived'/>
                </Tabs>
                <TableContainer sx={{maxHeight: '80%',
                    overflowY: 'auto',}}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableBody>
                            {events?.data?.data
                                .map((row: EventData) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name} sx={{
                                            "& .MuiTableRow-root:hover": {
                                                backgroundColor: "primary.light"
                                            },
                                        }}>
                                            <TableCell align={'left'}>
                                                <KeyboardArrowDownIcon/>
                                            </TableCell>
                                            <TableCell align={'left'}><Typography
                                                variant={'subtitle1'}>{row?.date ? fns.format(row.date, 'd.LL.yyyy', {locale: ru}) : '-'}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    cursor: 'pointer'
                                                }} onClick={() => nav(`${RoutesName.Event}${row.id}`)}>
                                                    <Typography
                                                        variant={'subtitle1'}>{row.name}
                                                    </Typography>

                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: '4px',
                                                    flexWrap: 'wrap',
                                                    maxWidth: '130px'
                                                }}>
                                                    {row.managers.map(user => user.id).includes(id) &&
                                                        <Chip label={'Ответственный'}
                                                              variant={'outlined'} size={'small'} style={{borderColor: '#1FD4E9'}}
                                                        />
                                                    }
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )

                                })}
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                History
                                            </Typography>
                                            <Table size="small" aria-label="purchases">
                                                <TableBody>
                                                    {events?.data?.data((row) => {
                                                        return (<TableRow key={row.name}>
                                                            <TableCell component="th" scope="row">
                                                                {'fff'}
                                                            </TableCell>
                                                            <TableCell>{'f'}</TableCell>
                                                            <TableCell align="right">{'dd'}</TableCell>
                                                            <TableCell align="right">
                                                                {'dd'}
                                                            </TableCell>
                                                        </TableRow>)
                                                    })}

                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>

    </Box>
    )
}