import {Avatar, Box, Chip, IconButton, Paper, Typography} from "@mui/material";
import { useState} from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import {format} from "date-fns";
import {getStatus} from "../../utils.ts";
import {AddTaskModal} from "../AddTask/AddTaskModal.tsx";
import {TaskModal} from "./TaskModal.tsx";
import {TaskData} from "../../../../types/tasks";

type EventProps = {
    item: TaskData,
    color: string;
}

export const Task = ({item, color}: EventProps) => {
    const labelChip = item?.user?.name.split(' ')[0] + ' ' + item?.user?.name.split(' ')[1].split('')[0] + '.'
    const labelAvatar = item?.user?.name.split(' ')[0].split('')[0] + item?.user?.name.split(' ')[1].split('')[0]
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openTaskModal, setOpenTaskModal] = useState(false)

    const handleClickEdit = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setOpenAddTaskModal(true)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setOpenTaskModal(true)
    };


    return (
        <Paper
            variant={'outlined'}
            sx={{
                borderColor: new Date(item.deadline).getTime() < Date.now() ? '#D32F2F' : color,
                borderWidth: '2px',
                padding: '12px',
                paddingTop: '0px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginRight: '12px',
                borderRadius: '10px',
                cursor: 'pointer',
                maxWidth: '230px'
            }}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography sx={{fontWeight: '500'}}>{item.name}</Typography>
                <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => handleClickEdit(e)}>
                    <EditOutlinedIcon/>
                </IconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start', gap: '12px',
            }}
                 onClick={(e) => handleClick(e)}>
                <Chip variant={'outlined'} label={labelChip} avatar={<Avatar>{labelAvatar}</Avatar>} size={'small'}/>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px'}}>

                    <CalendarMonthOutlinedIcon color={new Date(item.deadline).getTime() < Date.now() ? 'error' : 'inherit'}/>

                    <Typography variant={'subtitle1'}>{format(item.deadline, "dd.MM.yyyy HH:mm")}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px'}}>

                    <ArrowDropDownCircleOutlinedIcon/>

                    <Typography variant={'subtitle1'}>{getStatus(item.status)}</Typography>
                </Box>
            </Box>
            {/*<TaskPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} task={item} color={color} />*/}
            <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} task={item}/>
            <TaskModal open={openTaskModal} setOpen={setOpenTaskModal} task={item}/>
        </Paper>
    )
}