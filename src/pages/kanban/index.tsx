import {Box, Divider, FormControlLabel, IconButton, TextField, Typography} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from "@mui/material/Button";
import {Column} from "./components/Column.tsx";
import {UsersPopover} from "./components/UsersPopover.tsx";
import {AddTaskModal} from "./components/AddTask/AddTaskModal.tsx";
import {useQuery} from "react-query";
import {TasksApi} from "../../api/tasks";
import {TaskData} from "../../types/tasks";
import {EventsApi} from "../../api/events";

export const KanbanPage = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [eventName, setEventName] = useState(null)
    const [userName, setUserName] = useState(null)
    const [isMine, setIsMine] = useState(false)
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const { data: events } = useQuery(
        ['events'],
        () => EventsApi.get({page: 1, take: 1000}),
        { refetchOnWindowFocus: false }
    );

    const { data: tasks } = useQuery(
        ['tasks', eventName, userName, isMine],
        () => TasksApi.get({event_name: eventName, user_name: userName, is_mine: isMine}),
        { refetchOnWindowFocus: false }
    )

    return (
        <Box className={'content'}
             sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
             }}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem', marginBottom: '20px',}}>
                <Autocomplete
                    renderInput={params => (
                        <TextField
                            {...params}
                            label={'Мероприятие'}
                            sx={{fontSize: '16px'}}
                        />
                    )}
                    size={'small'}
                    onInputChange={(event: never, newValue: string | null) => {
                        setEventName(newValue);
                        console.log(newValue)
                    }}
                    options={events?.data?.data?.map(event => event.name) ?? []}
                    sx={{width: '350px'}}
                    /*getOptionLabel={(option: EventData) => option?.name}*/
                    value={eventName}
                />
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px', borderColor: '#1FD4E9'}}/>
                <FormControlLabel control={<Checkbox checked={isMine} onChange={() => setIsMine(!isMine)}/>} label="Только мои задачи"/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px', borderColor: '#1FD4E9'}}/>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onClick={handleClick}>
                        <FilterListIcon/>
                    </IconButton>
                    <Typography>Выбрать пбшку</Typography>
                    <UsersPopover open={open} anchorEl={anchorEl}
                                  setAnchorEl={setAnchorEl} userName={userName} setUserName={setUserName}/>
                </Box>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px', borderColor: '#1FD4E9'}}/>
                <Button size={'small'} variant={'contained'} color={'primary'} sx={{width: '230px'}}
                        onClick={() => setOpenAddTaskModal(true)}>Создать
                    задачу</Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                <Column tasks={tasks?.data?.filter((task: TaskData) => task.status === 'open')}
                        title={'Открыта'} titleColor={'#069AAB'} color={'#1DB8CA'}/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px'}}/>
                <Column tasks={tasks?.data?.filter((task: TaskData) => task.status === 'at_work')}
                        title={'В работе'} titleColor={'#7E1AB0'} color={'#AF52DE'}/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px'}}/>
                <Column tasks={tasks?.data?.filter((task: TaskData) => task.status === 'review')}
                        title={'На проверке'} titleColor={'#CC7C0B'} color={'#FF9500'}/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px'}}/>
                <Column tasks={tasks?.data?.filter((task: TaskData) => task.status === 'closed')}
                        title={'Выполнена'} titleColor={'#01AF2D'} color={'#34C759'}/>
            </Box>
            <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal}/>
        </Box>
    )
}