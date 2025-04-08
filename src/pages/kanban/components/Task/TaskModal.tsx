import {Avatar, Box, Chip, CircularProgress, IconButton, Modal, Typography} from "@mui/material";
import { useState} from "react";
import {format} from "date-fns";
import {getStatus, getStatusColor} from "../../utils.ts";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {AddTaskModal} from "../AddTask/AddTaskModal.tsx";
import {TaskData} from "../../../../types/tasks";
import {useQuery} from "react-query";
import {TasksApi} from "../../../../api/tasks";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    maxWidth: '600px',
    bgcolor: '#FFF',
    borderRadius: '20px',
    boxShadow: 24,
    p: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
};

type TaskModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    task: TaskData,
    id?: string
}

export const TaskModal = ({open, setOpen, task, id}: TaskModalProps) => {
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [realTask, setRealTask] = useState(task)
    const labelChip = realTask?.user?.name.split(' ')[0] + ' ' + realTask?.user?.name.split(' ')[1]
    const labelAvatar = realTask?.user?.name?.split(' ')[0]?.split('')[0] + realTask?.user?.name.split(' ')[1].split('')[0]


    const handleClose = () => {
        setOpen(false)
    }

    const handleEditClick = () => {
        setOpenAddTaskModal(true)
        /*setOpen(false)*/
    }

    const { isLoading } = useQuery('task', () => TasksApi.getTask({id: id}), {
        onSuccess: res => {
            {
                setRealTask({
                    id: res.data.id,
                    status: res.data.status,
                    name: res.data.name,
                    user_id: res.data.user.id,
                    event_id: res.data.event_id,
                    description: res.data.description,
                    deadline: res.data.deadline,
                    created_at: res.data.created_at,
                    event: res.data.event,
                    priority: res.data.priority,
                    updated_at: res.data.updated_at,
                    user: res.data.user
                });
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!id
    });

    return (
        <Modal open={open} onClose={handleClose} key={realTask?.id} disableEnforceFocus>
            {isLoading ? <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CircularProgress/>
            </Box> : <Box sx={style}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        width: '100%',
                        paddingTop: '5px'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: '500',
                                margin: 0,
                                padding: 0
                            }}>{realTask?.name}</Typography>
                        <IconButton onClick={handleEditClick}>
                            <EditOutlinedIcon/>
                        </IconButton>
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Описание задачи</Typography>
                        <Box sx={{maxHeight: '100px', overflowY: 'auto'}}>
                            <Typography
                                color={'textPrimary'}>{realTask?.description ?? '-'}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Выполняющий</Typography>
                        <Chip variant={'outlined'} label={labelChip} avatar={<Avatar>{labelAvatar}</Avatar>}
                              size={'small'}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Дедлайн</Typography>
                        <Typography
                            color={'textPrimary'}>{format(realTask?.deadline ?? new Date(), "dd.MM.yyyy HH:mm")}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Статус</Typography>
                        <Chip variant={'outlined'} label={getStatus(realTask?.status ?? 'open')}
                              sx={{
                                  borderColor: getStatusColor(realTask?.status ?? 'open'),
                                  color: getStatusColor(realTask?.status ?? 'open')
                              }} size={'small'}/>
                    </Box>
                    <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} task={realTask}/>
                </Box>
            </Box>}
        </Modal>
    )
}