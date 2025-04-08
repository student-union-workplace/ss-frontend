import {Avatar, Box, Chip, CircularProgress, Divider, IconButton, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';
import {useForm} from "react-hook-form";
import {EventData, EventFormValues, User} from "../../../types/events";
import {ADD_EVENT_INITIAL_VALUE} from "../addEvent/constants.ts";
import { useMemo, useState} from "react";
import {TextInput} from "../../../components/controls/TextInput.tsx";
import {AutocompleteInput} from "../../../components/controls/AutocompleteInput.tsx";
import {DateControl} from "../addEvent/components/DateControl.tsx";
import {CustomControl} from "../../../components/controls/CustomControl";
import {PlaceControl} from "../addEvent/components/PlaceControl.tsx";
import {ResponsibleControl} from "../addEvent/components/ResponsibleControl.tsx";
import {TeamControl} from "../addEvent/components/TeamControl.tsx";
import {GoogleDocument} from "./components/GoogleDocument.tsx";
import {OtherDocument} from "./components/OtherDocument.tsx";
import {AddDocumentModal} from "./components/AddDocumentModal.tsx";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {EventsApi} from "../../../api/events";
import {format} from "date-fns";
import {useParams} from "react-router-dom";
import Switch from "@mui/material/Switch";
import {DecodedJwt} from "../../../utils/jwt/DecodedJwt.tsx";
import {Role} from "../../../enums/roles";

export const Event = () => {
    const queryClient = useQueryClient();
    const params = useParams();
    const eventId = params.id;
    const role = DecodedJwt()?.role;

    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isEditLastEvent, setIsEditLastEvent] = useState(false)
    const [isEditTheme, setIsEditTheme] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)
    const [isEditDate, setIsEditDate] = useState(false)
    const [isEditPlace, setIsEditPlace] = useState(false)
    const [isEditResponsible, setIsEditResponsible] = useState(false)
    const [isEditTeam, setIsEditTeam] = useState(false)
    const [openAddDocumentModal, setOpenAddDocumentModal] = useState(false)

    const {control, reset, watch} = useForm<EventFormValues>({
        defaultValues: ADD_EVENT_INITIAL_VALUE,
    });

    const themeOptions = useMemo(() => {
        return [
            {label: 'Слет', value: '0111a2d3-d3e6-11ef-aa2a-50ebf6992398'},
            {label: 'Квиз', value: '94a1eb6c-d3e0-11ef-aa2a-50ebf6992398'},
            {label: 'Квест', value: 'a15ad887-d3e0-11ef-aa2a-50ebf6992398'},
            {label: 'Знакомка', value: 'ac4cf8f7-d3e0-11ef-aa2a-50ebf6992398'},
        ]
    }, [])

    const { data: events } = useQuery(
        ['events'],
        () => EventsApi.get({page:  1, take: 1000}),
        { refetchOnWindowFocus: false }
    );

    const lastEventOptions = useMemo(() => {
        if (events?.data?.data) {
            return events?.data?.data.map((event: EventData) => ({label: event.name, value: event.id}))
        }
    }, [events?.data?.data])

    const documents = useMemo(() => {
        return {
            google: [{type: 'doc', title: 'Сценарий для ведущих', link: '/'}, {
                type: 'xls',
                title: 'Эксель для гугла вот такой вот',
                link: '/'
            }, {
                type: 'xls',
                title: 'Эксель для гугла вот такой вот',
                link: '/'
            }],
            other: [{type: 'ppt', title: 'Презентация, загруженная прямо из компьютера', link: '/'}, {
                type: 'xlsx',
                title: 'Эксель табличка настоящая',
                link: '/'
            }]
        }
    }, []);

    const { isLoading } = useQuery('event', () => EventsApi.getEvent({id:eventId as string}), {
        onSuccess: res => {
            {
                reset({
                    locations: res.data.locations,
                    name: res.data.name,
                    theme_id: res.data.theme_id,
                    past_event_id: res.data.past_event_id,
                    users: res.data.users,
                    managers: res.data.managers,
                    date: res.data.date,
                    is_archived: res.data.is_archived,
                    description: res.data.description
                });
            }
        },
        refetchOnWindowFocus: false,
    });

    const updateMutation = useMutation(EventsApi.update, {
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        }
    });

    const changeStatusMutation = useMutation(EventsApi.changeStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries('event');
        }
    });

    const changeStatusHandler = async() => {
        await changeStatusMutation.mutateAsync({id: eventId as string});
    }

    const updateTitleHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    name: watch('name'),
                }
            });
            setIsEditTitle(false)
        } catch (error) {
            console.log(error);
        }
    };

    const updatePastEventHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    past_event_id: watch('past_event_id'),
                }
            });
            setIsEditLastEvent(false)
        } catch (error) {
            console.log(error);
        }
    };

    const updateThemeHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    theme_id: watch('theme_id'),
                }
            });
            setIsEditTheme(false)
        } catch (error) {
            console.log(error);
        }
    };

    const updateDescriptionHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    description: watch('description'),
                }
            });
            setIsEditDescription(false)
        } catch (error) {
            console.log(error);
        }
    };

    const updateDateHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    date: watch('date'),
                }
            });
            setIsEditDate(false)
        } catch (error) {
            console.log(error);
        }
    };

    const updateLocationsHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    locations: watch('locations').map(place => place.id),
                }
            });
            setIsEditPlace(false)
        } catch (error) {
            console.log(error);
        }
    };

    const updateManagersHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    managers: watch('managers').map(user => user.id),
                }
            });
            setIsEditResponsible(false)
        } catch (error) {
            console.log(error);
        }
    };

    const updateUsersHandler = async () => {
        try {
            await updateMutation.mutateAsync({
                id: eventId as string,
                data: {
                    users: watch('users').map(user => user.id),
                }
            });
            setIsEditTeam(false)
        } catch (error) {
            console.log(error);
        }
    };

    console.log(watch('is_archived'))
    return (
        isLoading ? <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CircularProgress/>
                </Box> :
    <Box className={'content'}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'end',
        }}>
            <Typography variant={'h4'}
                        sx={{textAlign: 'center'}}>{watch('name') ?? 'Карточка мероприятия'}</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Switch checked={watch('is_archived')}
                        onChange={() => changeStatusHandler()}/>
                <Typography>{watch('is_archived') ? 'Завершено' : 'В работе'}</Typography>
            </Box>

        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '136px',
            paddingTop: '40px'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '40px', minWidth: '365px'}}>
                {isEditTitle && role !== Role.Old ? <TextInput name={'name'} control={control} label={'Название мероприятия'}
                                          onBlur={() => updateTitleHandler()}/> : <Box>
                    <Typography variant={'subtitle2'} color={'textSecondary'}>Название</Typography>
                    <Typography
                        variant={'h6'}
                        onDoubleClick={() => setIsEditTitle(true)}
                    >
                        {watch('name') ?? '-'}
                    </Typography>
                </Box>}
                <Box>
                    <Typography variant={'subtitle2'} color={'textSecondary'}>Канбан-доска</Typography>
                    <Button variant={'contained'} size={'small'} color={'primary'}>Перейти</Button>
                </Box>
                {isEditLastEvent && role !== Role.Old  ?
                    <AutocompleteInput name={'past_event_id'} label={'Прошлогоднее мероприятие'} control={control}
                                       options={lastEventOptions} onBlur={() => updatePastEventHandler()}/>
                    : <Box>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Прошлогоднее меро</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
                            <Typography
                                variant={'h6'}
                                onDoubleClick={() => setIsEditLastEvent(true)}
                            >
                                {events?.data?.data?.filter((event: EventData) => event.id === watch('past_event_id'))[0]?.name ?? '-'}
                            </Typography>
                            <IconButton color={'primary'}>
                                <OpenInNewIcon/>
                            </IconButton>
                        </Box>
                        <Typography>Тема была захватывающей</Typography>
                    </Box>
                }
                {isEditTheme && role !== Role.Old  ? <AutocompleteInput name={'theme_id'} label={'Тема мероприятия*'} control={control}
                                                  options={themeOptions} onBlur={() => updateThemeHandler()}/>
                    : <Box>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Тема мероприятия</Typography>
                        <Typography variant={'h6'}
                                    onDoubleClick={() => setIsEditTheme(true)}>{themeOptions.filter((theme) => theme.value === watch('theme_id'))[0]?.label ?? '-'}</Typography>
                    </Box>
                }
                {isEditDescription && role !== Role.Old  ?
                    <TextInput name={'description'} control={control} label={'Описание мероприятия'} multiline
                               rows={7} onBlur={() => updateDescriptionHandler()}/>
                    : <Box sx={{maxWidth: '327px'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Описание</Typography>
                        <Typography
                            onDoubleClick={() => setIsEditDescription(true)}>{watch('description')?.length ? watch('description') : '-'}</Typography>
                    </Box>
                }
                {isEditDate && role !== Role.Old  ? <CustomControl
                    name={'date'}
                    control={control}
                    Component={DateControl}
                    onBlur={() => updateDateHandler()}
                /> : <Box>
                    <Typography variant={'subtitle2'} color={'textSecondary'}>Дата и время проведения</Typography>
                    <Typography variant={'h6'} onDoubleClick={() => setIsEditDate(true)}>{format(watch('date'), 'dd.MM.yyyy HH:mm')}</Typography>
                </Box>}
                {isEditPlace && role !== Role.Old ? <CustomControl
                        name={'locations'}
                        control={control}
                        Component={PlaceControl}
                        onBlur={() => updateLocationsHandler()}
                        label={'Место'}
                    />
                    : <Box>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Место</Typography>
                        <Box sx={{display: 'flex', gap: '10px', maxWidth: '264px', flexWrap: 'wrap'}}
                             onDoubleClick={() => setIsEditPlace(true)}>
                            {
                                watch('locations').length ?watch('locations').map((place) => {
                                        return <Chip label={place.name} variant={'outlined'}
                                                     style={{borderColor: '#1FD4E9'}}/>
                                    }) : '-'
                            }
                        </Box>
                    </Box>}
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem
                     sx={{borderWidth: '2px', borderColor: '#1FD4E9'}}/>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', width: '365px'}}>
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Рабочие документы</Typography>
                        <IconButton size={'small'} color={'primary'} onClick={() => setOpenAddDocumentModal(true)}>
                            <AddIcon/>
                        </IconButton>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px',
                        maxHeight: '270px',
                        backgroundColor: '#F4FEFF',
                        paddingBlock: '5px',
                        paddingInline: '10px',
                        borderRadius: '20px',
                        gap: '20px',
                        overflowY: 'auto'
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <Typography variant={'caption'}>Google</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                {documents.google.map((doc) => {
                                        return <GoogleDocument doc={doc}/>
                                    }
                                )}
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <Typography variant={'caption'}>Дополнительные файлы</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                {documents.other.map((doc) => {
                                        return <OtherDocument doc={doc}/>
                                    }
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {isEditResponsible && role !== Role.Old  ? <CustomControl
                        name={'managers'}
                        control={control}
                        Component={ResponsibleControl}
                        label={'Ответственные*'}
                        onBlur={() => updateManagersHandler()}
                    />
                    : <Box>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Ответственный</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            maxWidth: '264px',
                            flexWrap: 'wrap'
                        }}
                             onDoubleClick={() => setIsEditResponsible(true)}
                        >
                            {
                                watch('managers')?.length ? watch('managers')?.map((user: User) => {
                                    return <Chip label={user.name} variant={'outlined'}
                                                 avatar={<Avatar>{user.name.split('')[0]}</Avatar>}
                                                 style={{borderColor: '#1FD4E9'}}/>
                                }) : '-'
                            }
                        </Box>

                    </Box>}
                {isEditTeam && role !== Role.Old ? <CustomControl
                        name={'users'}
                        control={control}
                        Component={TeamControl}
                        label={'Команда'}
                        onBlur={() => updateUsersHandler()}
                    />
                    : <Box>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Команда</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            maxHeight: '242px',
                            overflowY: 'auto',
                            width: '420px'
                        }}
                             onDoubleClick={() => setIsEditTeam(true)}
                        >
                            {watch('users')?.length ? watch('users')?.map((user: User) => {
                                return <Chip label={user.name} avatar={<Avatar>{user.name.split('')[0]}</Avatar>}
                                             variant={'outlined'} style={{borderColor: '#1FD4E9'}}/>
                            }) : 'Собери свою команду мечты!'}
                        </Box>
                    </Box>}
            </Box>
        </Box>
        <AddDocumentModal open={openAddDocumentModal} setOpen={setOpenAddDocumentModal} control={control}
                          name={'docs'}/>
    </Box>

    )
};