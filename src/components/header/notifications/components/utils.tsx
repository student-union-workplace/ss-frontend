import EventIcon from '@mui/icons-material/Event';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

export const getIcons = (type: "event" | "deadline" | "activity" | "task") => {
    switch (type) {
        case 'event':
            return <EventIcon fontSize={'small'}/>;
        case 'deadline':
            return <WarningAmberIcon fontSize={'small'}/>;
        case 'activity':
            return <EventNoteOutlinedIcon fontSize={'small'}/>;
        case 'task':
            return <TaskOutlinedIcon fontSize={'small'}/>;
        default:
            return null;
    }
}

export const getTitle = (type: "event" | "deadline" | "activity" | "task") => {
    switch (type) {
        case 'event':
            return 'Мероприятие'
        case 'deadline':
            return 'Задача';
        case 'activity':
            return 'Событие';
        case 'task':
            return 'Задача';
        default:
            return null;
    }
}

export const getStartPhrase = (type: "event" | "deadline" | "activity" | "task") => {
    switch (type) {
        case 'event':
            return 'Вас добавили к '
        case 'deadline':
            return 'Приближается дедлайн: ';
        case 'activity':
            return 'Вас добавили к ';
        case 'task':
            return 'Вам назначена задача: ';
        default:
            return null;
    }
}