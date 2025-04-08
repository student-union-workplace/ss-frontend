import {Box, CircularProgress, Divider, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {EventData, EventFormValues} from "../../../types/events";
import {ADD_EVENT_INITIAL_VALUE} from "./constants.ts";
import {useMemo} from "react";
import {AutocompleteInput} from "../../../components/controls/AutocompleteInput.tsx";
import {TextInput} from "../../../components/controls/TextInput.tsx";
import {CustomControl} from "../../../components/controls/CustomControl";
import {PlaceControl} from "./components/PlaceControl.tsx";
import {ResponsibleControl} from "./components/ResponsibleControl.tsx";
import {DateControl} from "./components/DateControl.tsx";
import {TeamControl} from "./components/TeamControl.tsx";
import Button from "@mui/material/Button";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {EventsApi} from "../../../api/events";
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../../enums/routes";

export const AddEvent = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {control, handleSubmit} = useForm<EventFormValues>({
        defaultValues: ADD_EVENT_INITIAL_VALUE,
    });

    const {data: events, isLoading: isLoadingEvents} = useQuery(
        ['events'],
        () => EventsApi.get({page: 1, take: 10000}),
        {refetchOnWindowFocus: false}
    );

    const lastEventOptions = useMemo(() => {
        if (events?.data?.data) {
            return events.data.data.map((event: EventData) => ({
                label: event.name, value: event.id
            }))
        }
    }, [events])

    const themeOptions = useMemo(() => {
        return [
            {label: 'Слет', value: '0111a2d3-d3e6-11ef-aa2a-50ebf6992398'},
            {label: 'Квиз', value: '94a1eb6c-d3e0-11ef-aa2a-50ebf6992398'},
            {label: 'Квест', value: 'a15ad887-d3e0-11ef-aa2a-50ebf6992398'},
            {label: 'Знакомка', value: 'ac4cf8f7-d3e0-11ef-aa2a-50ebf6992398'},
        ]
    }, [])

    const creatwMutation = useMutation(EventsApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        }
    });

    const createHandler = async (values: EventFormValues) => {
        try {
            const response = await creatwMutation.mutateAsync({
                name: values.name,
                date: values.date,
                locations: values.locations.map(location => location.id),
                managers: values.managers.map(user => user.id),
                users: values.users.map(user => user.id),
                past_event_id: values.past_event_id,
                description: values.description,
                is_archived: values.is_archived,
                theme_id: values.theme_id
            });

            if (response.status === 201) {
                navigate(RoutesName.Events)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isLoading = isLoadingEvents

    return (
        <Box className={'content'}>
            <Typography variant={'h4'} sx={{textAlign: 'center'}}>Создание мероприятия</Typography>
            {isLoading ? <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CircularProgress/>
            </Box> : <form onSubmit={handleSubmit(createHandler)}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '136px',
                    paddingTop: '40px'
                }}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', minWidth: '365px'}}>
                        <Typography variant={'h6'}>Описание меро</Typography>
                        <AutocompleteInput name={'past_event_id'} label={'Прошлогоднее мероприятие'} control={control}
                                           options={lastEventOptions}/>
                        <TextInput name={'name'} control={control} label={'Название мероприятия'}/>
                        <AutocompleteInput name={'theme_id'} label={'Тема мероприятия*'} control={control}
                                           options={themeOptions}/>
                        <TextInput name={'description'} control={control} label={'Описание мероприятия'} multiline
                                   rows={7}/>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem
                             sx={{borderWidth: '2px', borderColor: '#1FD4E9'}}/>
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', gap: '45px', width: '365px', alignItems: 'end'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', minWidth: '365px'}}>
                            <Typography variant={'h6'}>Дата, место, рабочка</Typography>
                            <CustomControl
                                name={'date'}
                                control={control}
                                Component={DateControl}
                            />
                            <CustomControl
                                name={'locations'}
                                control={control}
                                Component={PlaceControl}
                                label={'Место'}
                            />
                            <CustomControl
                                name={'managers'}
                                control={control}
                                Component={ResponsibleControl}
                                label={"Ответственный*"}
                            />
                            <CustomControl
                                name={'users'}
                                control={control}
                                Component={TeamControl}
                                label={"Команда*"}
                            />

                        </Box>
                        <Button variant={'contained'} sx={{width: '200px', textAlign: 'end'}}
                                type={'submit'}>Создать</Button>
                    </Box>
                </Box>

            </form>}
        </Box>
    )
}