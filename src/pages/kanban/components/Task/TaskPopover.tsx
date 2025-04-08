import {Avatar, Box, Chip, IconButton, Paper, Popover, Typography} from "@mui/material";
import React, {useMemo, useState} from "react";
import {format} from "date-fns";
import {getStatus} from "../../utils.ts";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {AddTaskModal} from "../AddTask/AddTaskModal.tsx";

type EventPopoverProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean;
        task: {
            title: string;
            user_id: string;
            deadline: Date;
            status: 'open' | 'at_work' | 'review' | 'closed',
            description?: ''
        },
    color: string
}

export const TaskPopover = ({setAnchorEl, open, anchorEl, task, color}: EventPopoverProps) => {
    const id = open ? 'task-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const users = useMemo(() => {
        return [{name: 'Ксения Попова', id: '1'}, {name: 'Вера Богорад', id: '2'}, {
            name: 'Максим Живцов',
            id: '3'
        }, {name: 'Роман Гареев', id: '4'}]
    }, []);
    const user = users.filter((user) => task.user_id === user.id)[0]
    const labelChip = user.name.split(' ')[0] + ' ' + user.name.split(' ')[1]
    const labelAvatar = user.name.split(' ')[0].split('')[0] + user.name.split(' ')[1].split('')[0]
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)

    return (
        <Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorEl={anchorEl}
            sx={{marginLeft: '10px'}}
        >
            <Paper
                variant={'outlined'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    padding: '15px',
                    borderColor: task.deadline.getTime() < Date.now() ? '#D32F2F' : color,
                    borderWidth: '3px',
                    borderRadius: '10px',
                    maxWidth: '460px',
                    /*width: '460px',*/
                    paddingTop: '5px'
                }}>
                <Box
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: '15px', fontWeight: '500', margin: 0, padding: 0}}>{task.title}</Typography>
                    <IconButton>
                        <EditOutlinedIcon/>
                    </IconButton>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '12px'}}>Описание задачи</Typography>
                    <Box sx={{maxHeight: '130px', overflowY: 'auto'}}>
                        <Typography variant={'subtitle1'} color={'textPrimary'}>{task.description}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start',}}>
                    <Typography sx={{fontSize: '12px'}}>Выполняющий</Typography>
                    <Chip variant={'outlined'} label={labelChip} avatar={<Avatar>{labelAvatar}</Avatar>}
                          size={'small'}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '12px'}}>Дедлайн</Typography>
                    <Typography variant={'subtitle1'}
                                color={'textPrimary'}>{format(task.deadline, "dd.MM.yyyy")}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '12px'}}>Выполняющий</Typography>
                    <Typography variant={'subtitle1'}>{getStatus(task.status)}</Typography>
                </Box>
                <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} />
            </Paper>
        </Popover>
    )
}