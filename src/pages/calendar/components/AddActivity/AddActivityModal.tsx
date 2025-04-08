import {Box, CircularProgress, Modal, Typography} from "@mui/material";
import {TextInput} from "../../../../components/controls/TextInput.tsx";
import {useForm} from "react-hook-form";
import {CustomControl} from "../../../../components/controls/CustomControl";
import {DateControl} from "./DateControl.tsx";
import Button from "@mui/material/Button";
import { useMemo} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import { ActivityFormValues} from "../../../../types/activities";
import {ADD_ACTIVITY_INITIAL_VALUE} from "./constants.ts";
import {TeamControl} from "./TeamControl.tsx";
import {AutocompleteInput} from "../../../../components/controls/AutocompleteInput.tsx";
import {LocationsApi} from "../../../../api/locations";
import {LocationData} from "../../../../types/locations";
import {ActivitiesApi} from "../../../../api/activities";
import {UserData} from "../../../../types/users";
import {DecodedJwt} from "../../../../utils/jwt/DecodedJwt.tsx";
import {Role} from "../../../../enums/roles";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: '#FFF',
    borderRadius: '20px',
    boxShadow: 24,
    p: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
};

type AddActivityModal = {
    open: boolean;
    setOpen: (open: boolean) => void;
    idActivity?: string | null;
}

export const AddActivityModal = ({open, setOpen, idActivity}: AddActivityModal) => {
    const queryClient = useQueryClient();
    const role = DecodedJwt()?.role;

    if (role === Role.Old) {
        setOpen(false)
    }


    const handleClose = () => {
        setOpen(false)
        reset({})
    }
    const {control, reset, handleSubmit} = useForm<ActivityFormValues>({
        defaultValues: ADD_ACTIVITY_INITIAL_VALUE,
    });

    const { isLoading } = useQuery(['activity', idActivity], () => ActivitiesApi.getActivity({id: idActivity as string}), {
        onSuccess: res => {
            {
                reset({})
                reset({
                    name: res.data.name,
                    description: res.data.description,
                    date: res.data.date,
                    location_id: res.data.location.id,
                    users: res.data.users,
                });
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!idActivity
    });

    const createMutation = useMutation(ActivitiesApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('activities');
            queryClient.removeQueries('activities');
        }
    });

    const updateMutation = useMutation(ActivitiesApi.update, {
        onSuccess: () => {
            queryClient.invalidateQueries('activities');
            queryClient.removeQueries('activities');
        }
    });

    const {data: places} = useQuery(
        ['places'],
        () => LocationsApi.get(),
        {refetchOnWindowFocus: false}
    );

    const placeOptions = useMemo(() => {
        if (places?.data) {
            return places?.data.map((place: LocationData) => ({label: place.name, value: place.id}));
        }
    },[places?.data])

    const createHandler = async (values: ActivityFormValues) => {
        try {
            if (idActivity) {
                const response = await updateMutation.mutateAsync({
                    id: idActivity,
                    data: {
                        name: values.name,
                        description: values.description,
                        date: values.date,
                        users: values.users.map((user: UserData) => user.id),
                        location_id: values.location_id,
                    }
                });

                if (response.status === 200) {
                    setOpen(false)
                    reset({})
                }
            } else {
                const response = await createMutation.mutateAsync({
                    name: values.name,
                    description: values.description,
                    date: values.date,
                    users: values.users?.map((user: UserData) => user.id),
                    location_id: values.location_id,
                });

                if (response.status === 201) {
                    setOpen(false)
                    reset({})
                }
            }

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            {isLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : <form onSubmit={handleSubmit(createHandler)}>
                <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '30px',
                        width: '100%',
                    }}>
                        <Typography sx={{fontSize: '24px'}}>
                            Событие
                        </Typography>

                        <TextInput name={'name'} control={control} label={'Название'} multiline={true}
                                   rows={2}/>
                        <TextInput name={'description'} control={control} label={'Описание'} multiline={true}
                                   rows={5}/>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px', width: '100%',
                        }}>
                            <Box sx={{width: '100%'}}>
                                <CustomControl
                                    name={'users'}
                                    control={control}
                                    Component={TeamControl}
                                    label={"Пользователи"}
                                />
                            </Box>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px', width: '100%',
                        }}>
                            <Box sx={{width: '100%'}}>
                                <CustomControl
                                    name={'date'}
                                    control={control}
                                    Component={DateControl}
                                />
                            </Box>
                            <Box sx={{width: '100%'}}>
                                {/*<CustomControl
                                    name={'location_id'}
                                    control={control}
                                    Component={PlaceControl}
                                />*/}
                                <AutocompleteInput name={'location_id'} label={'Место'} control={control}
                                                   options={placeOptions}/>
                            </Box>

                        </Box>

                        <Button variant={'contained'} sx={{width: '100%'}}
                                type={'submit'}>{idActivity ? 'Сохранить' : 'Создать'}</Button>
                    </Box>

                </Box>
            </form>}
        </Modal>
    );
}