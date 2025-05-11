import {Avatar, Box, CircularProgress, Divider, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {UsersApi} from "../../../../api/users";
import {DecodedJwt} from "../../../../utils/jwt/DecodedJwt.tsx";
import {useForm} from "react-hook-form";
import {Department, UserFormValues} from "../../../../types/users";
import {EDIT_USER_INITIAL_VALUE} from "../constants.ts";
import {useMemo, useState} from "react";
import {TextInput} from "../../../../components/controls/TextInput.tsx";
import {AutocompleteInput} from "../../../../components/controls/AutocompleteInput.tsx";
import {DepartmentsApi} from "../../../../api/departments";
import {Role} from "../../../../enums/roles";
import {useParams} from "react-router-dom";

export const Profile = () => {
    const queryClient = useQueryClient();
    const idJwt = DecodedJwt()!.id;
    const params = useParams();
    const idParams = params.id!;
    const role = DecodedJwt()?.role;
    const [isEdit, setIsEdit] = useState(false);
    const {control, handleSubmit, reset} = useForm<UserFormValues>({
        defaultValues: EDIT_USER_INITIAL_VALUE,
    });

    const {data: userData, isLoading} = useQuery(
        'user',
        () => UsersApi.getUser({id: idParams}),
        {
            onSuccess: (res) => {
                reset({
                    name: res?.data?.name,
                    email: res?.data?.email,
                    phone_number: res?.data?.phone_number,
                    vk_link: res?.data?.vk_link,
                    tg_link: res?.data?.tg_link,
                    department_id: res?.data?.department_id,
                    role: res?.data?.role,
                })
            },
            refetchOnWindowFocus: false
        }
    );

    const {data: departments} = useQuery('departments', () => DepartmentsApi.get(), {refetchOnWindowFocus: false})

    const editMutation = useMutation(UsersApi.update, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    const editHandler = async (values: UserFormValues) => {
        try {
            const response = await editMutation.mutateAsync({
                id: idParams,
                data: {
                    name: values?.name,
                    email: values?.email,
                    phone_number: values?.phone_number?.length ? values?.phone_number : null,
                    vk_link: values?.vk_link?.length ? values?.vk_link : null,
                    tg_link: values?.tg_link?.length ? values?.tg_link : null,
                    department_id: values?.department_id,
                    role: values?.role,
                }
            });

            if (response.status === 200) {
                setIsEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const departmentsOptions = useMemo(() => {
        if (departments) {
            return departments.data.map((department: Department) => ({value: department.id, label: department.name}))
        }
    }, [departments]);

    const rolesOptions = useMemo(() => {
        return [{label: 'Заместитель', value: Role.Admin},{label: 'Член комиссии', value: Role.Member},{label: 'Песок', value: Role.Old}]
    }, []);

    const getRole = (role: Role) => {
        switch (role) {
            case Role.Admin: return 'Заместитель';
            case Role.Member: return 'Член комиссии';
            case Role.Old: return 'Песок'
        }
    }

    return (
        <Box sx={{width :'100%'}}>
            <Typography sx={{textAlign: 'center', paddingBottom: '2rem'}} variant={'h5'}>{idJwt === idParams ? 'Мой профиль' : 'Профиль'}</Typography>
            {isLoading ? <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CircularProgress/>
            </Box> :
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '2rem', width: '100%'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <Avatar sx={{bgcolor: '#1DB8CA', width: '150px', height: '150px', cursor: 'pointer'}}>РГ</Avatar>
                        <Button variant={'contained'} color={'primary'} size={'small'}>Загрузить фото</Button>
                        {(role === Role.Admin || idParams === idJwt) && <Button variant={'contained'} color={'primary'} size={'small'}
                                 onClick={() => setIsEdit(!isEdit)}>
                            {isEdit ? 'Отменить' : 'Изменить данные'}</Button>}
                    </Box>
                    {isEdit ? <form onSubmit={handleSubmit(editHandler)}
                                    style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '70%'}}>
                        <TextInput name={'name'} control={control} label={'ФИО'}/>
                        <TextInput name={'phone_number'} control={control} label={'Тел'}/>
                        <TextInput name={'vk_link'} control={control} label={'ВК'}/>
                        <TextInput name={'tg_link'} control={control} label={'ТГ'}/>
                        <AutocompleteInput name={'department_id'} control={control} label={'Комиссия'}
                                           options={departmentsOptions}/>
                        <AutocompleteInput name={'role'} control={control} label={'Должность'} options={rolesOptions}/>
                        <Button type={'submit'}>сохранить</Button>
                    </form> :
                        <Box sx={{width :'70%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', width :'100%'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', width :'100%'}}>
                                    <Typography color={'textSecondary'}>ФИО </Typography>
                                    <Typography>{userData?.data?.name ?? '-'}</Typography>
                                </Box>
                                <Divider orientation="horizontal" variant="fullWidth" flexItem
                                         sx={{borderWidth: '0.5px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                                    <Typography color={'textSecondary'}>Тел </Typography>
                                    <Typography>{userData?.data?.phone_number ?? '-'}</Typography>
                                </Box>
                                <Divider orientation="horizontal" variant="fullWidth" flexItem
                                         sx={{borderWidth: '0.5px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                                    <Typography color={'textSecondary'}>ВК </Typography>
                                    <Typography>{userData?.data?.vk_link ?? '-'}</Typography>
                                </Box>
                                <Divider orientation="horizontal" variant="fullWidth" flexItem
                                         sx={{borderWidth: '0.5px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                                    <Typography color={'textSecondary'}>ТГ </Typography>
                                    <Typography>{userData?.data?.tg_link ?? '-'}</Typography>
                                </Box>
                                <Divider orientation="horizontal" variant="fullWidth" flexItem
                                         sx={{borderWidth: '0.5px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                                    <Typography color={'textSecondary'}>Комиссия </Typography>
                                    <Typography>{userData?.data?.department?.name ?? '-'}</Typography>
                                </Box>
                                <Divider orientation="horizontal" variant="fullWidth" flexItem
                                         sx={{borderWidth: '0.5px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                                    <Typography color={'textSecondary'}>Должность </Typography>
                                    <Typography>{getRole(userData?.data?.role) ?? '-'}</Typography>
                                </Box>
                                <Divider orientation="horizontal" variant="fullWidth" flexItem
                                         sx={{borderWidth: '0.5px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                                    <Typography color={'textSecondary'}>Погоняло </Typography>
                                    <Typography>{userData?.data?.name ?? '-'}</Typography>
                                </Box>
                                <Divider orientation="horizontal" variant="fullWidth" flexItem
                                         sx={{borderWidth: '0.5px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                            </Box>
                        </Box>
                    }
                </Box>}

        </Box>
    );
}