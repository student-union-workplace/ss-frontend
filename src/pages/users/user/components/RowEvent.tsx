import {useState} from "react";
import {Box, Chip, CircularProgress, Collapse, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export type RowEventProps = {
    row: EventData;
}

export const RowEvent = ({row}: RowEventProps) => {
    const nav = useNavigate();
    const params = useParams();
    const id = params.id!;
    const [open, setOpen] = useState(false);

    const {data: tasks, isLoading} = useQuery(
        ['tasks', row.id],
        () => TasksApi.get({user_id: id, event_name: row.name}),
        {refetchOnWindowFocus: false}
    );

    console.log(tasks?.data);
    return (<>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.name} sx={{
                "& .MuiTableRow-root:hover": {
                    backgroundColor: "primary.light"
                },
            }}>
                <TableCell align={'left'} >
                    {open ? <KeyboardArrowUpIcon sx={{cursor: 'pointer'}} onClick={() => setOpen(!open)}/> : <KeyboardArrowDownIcon sx={{cursor: 'pointer'}} onClick={() => setOpen(!open)}/>}
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
                        <OpenInNewIcon fontSize={'small'}/>

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
                                {isLoading ? <CircularProgress /> : <TableBody>
                                    {tasks?.data?.map((task: TaskData) => {
                                        return (<TableRow key={task.name}>
                                            <TableCell component="th" scope="row">
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    cursor: 'pointer'
                                                }}
                                                     onClick={() => nav(`${RoutesName.Kanban}?name=${row.name}&userId=${id}`)}>
                                                    <Typography
                                                        variant={'subtitle1'}>{task.name}
                                                    </Typography>
                                                    <OpenInNewIcon fontSize={'small'}/>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant={'outlined'}
                                                    label={getStatus(task?.status ?? 'open')}
                                                    sx={{
                                                        borderColor: getStatusColor(task?.status ?? 'open'),
                                                        color: getStatusColor(task?.status ?? 'open')
                                                    }}
                                                    size={'small'}
                                                />
                                            </TableCell>
                                        </TableRow>)
                                    })}
                                    {(tasks?.data?.length === 0) && <Typography>У пользователя нет задач в данном мероприятии</Typography>}
                                </TableBody>}
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}