import {Avatar, Box, Divider, IconButton, Typography} from "@mui/material";
import {getIcons, getTitle} from "./utils.tsx";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {format} from "date-fns";
import {ru} from 'date-fns/locale';
import {useState} from "react";
import {TaskModal} from "../../../../pages/kanban/components/Task/TaskModal.tsx";
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../../../enums/routes";
import {useMutation, useQueryClient} from "react-query";
import {NotificationsApi} from "../../../../api/notifications";
import {Notification} from "../../../../types/notifications";

export type NotificationItemProps = {
    item: Notification,
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
}

export const NotificationItem = ({item, setAnchorEl }: NotificationItemProps) => {
    const [openTaskModal, setOpenTaskModal] = useState(false)
    const [taskId, setTaskId] = useState(null)
    const nav = useNavigate()
    const queryClient = useQueryClient();

    const handleRedirect = () => {

        if (item.type === 'task' || item.type === 'deadline') {
            nav(RoutesName.Kanban)
            setOpenTaskModal(true)
            setTaskId(item.task_id)
        } else {
            setAnchorEl(null)
            nav(`${RoutesName.Event}${item.event_id}`)
        }
    }

    const deleteMutation = useMutation(NotificationsApi.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries('notifications');
        }
    });

    const deleteHandle = async () => {
        try {
            await deleteMutation.mutateAsync({ id: item.id });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px', paddingLeft: '20px'}}>
                <Box>
                    <Avatar sx={{bgcolor: '#1DB8CA', width: 28, height: 28}}>
                        {getIcons(item.type)}
                    </Avatar>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '15px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'left',
                        alignItems: 'start',
                        width: '90%'
                    }}>
                        <Typography sx={{fontWeight: '600', fontSize: '17px'}}>{getTitle(item.type)}</Typography>
                        <Typography variant={'subtitle1'} style={{ cursor: 'pointer'}} onClick={handleRedirect}>{item.title}</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'end',
                        width: '40%',
                        paddingRight: '5px'
                    }}>
                        <Typography variant={'caption'}>{format(item.created_at, 'd MMM yyyy, HH:mm', {locale: ru})}</Typography>
                        <IconButton sx={{padding: '4px'}} onClick={() => deleteHandle()}>
                            <RemoveRedEyeOutlinedIcon/>
                        </IconButton>
                    </Box>
                </Box>

            </Box>
            <Divider orientation="horizontal" flexItem
                     sx={{borderWidth: '1px',}}/>
            <TaskModal open={openTaskModal} setOpen={setOpenTaskModal} id={taskId}/>
        </Box>

    )
}