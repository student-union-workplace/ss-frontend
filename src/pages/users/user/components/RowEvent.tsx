import {useState} from "react";
import {Box, Chip, Collapse, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import * as fns from "date-fns";
import {ru} from "date-fns/locale";
import {RoutesName} from "../../../../enums/routes";
import {EventData} from "../../../../types/events";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {TasksApi} from "../../../../api/tasks";
import {getStatus, getStatusColor} from "../../../kanban/utils.ts";
import {TaskData} from "../../../../types/tasks";

export type RowEventProps = {
    row: EventData;
}

export const RowEvent = ({row}: RowEventProps) => {
    const nav = useNavigate();
    const params = useParams();
    const id = params.id!;
    const [open, setOpen] = useState(false);

    const {data: tasks} = useQuery(
        ['tasks', row.name],
        () => TasksApi.get({user_id: id, event_name: row.name}),
        {refetchOnWindowFocus: false}
    );

    return (<>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.name} sx={{
                "& .MuiTableRow-root:hover": {
                    backgroundColor: "primary.light"
                },
            }}>
                <TableCell align={'left'}>
                    {open ? <KeyboardArrowUpIcon onClick={() => setOpen(!open)}/> : <KeyboardArrowDownIcon onClick={() => setOpen(!open)}/>}
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
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {tasks?.data?.map((row: TaskData) => {
                                        return (<TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant={'outlined'}
                                                    label={getStatus(row?.status ?? 'open')}
                                                    sx={{ borderColor: getStatusColor(row?.status ?? 'open'),
                                                        color: getStatusColor(row?.status ?? 'open')}}
                                                    size={'small'}
                                                />
                                            </TableCell>
                                        </TableRow>);
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}