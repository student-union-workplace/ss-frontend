import {Box, Modal, Typography} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import {AddUserFormValue, Department} from "../../../../types/users";
import {useMemo} from "react";
import {Role} from "../../../../enums/roles";
import {DepartmentsApi} from "../../../../api/departments";
import {TextInput} from "../../../../components/controls/TextInput.tsx";
import {AutocompleteInput} from "../../../../components/controls/AutocompleteInput.tsx";
import {UsersApi} from "../../../../api/users";
import Button from "@mui/material/Button";
import {PasswordInput} from "../../../../components/controls/PasswordInput.tsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '400px',
    maxWidth: '600px',
    bgcolor: '#FFF',
    borderRadius: '20px',
    boxShadow: 24,
    p: '25px',
};

type AddUserModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const AddUserModal = ({open, setOpen}: AddUserModalProps) => {
    const queryClient = useQueryClient();
    const handleClose = () => {
        setOpen(false)
    }
    const {control, reset, handleSubmit} = useForm<AddUserFormValue>({
        defaultValues: {name: '', role: Role.Member, department_id: '', email: '', password: ''},
    });

    const {data: departments} = useQuery('departments', () => DepartmentsApi.get(), {refetchOnWindowFocus: false})

    const departmentsOptions = useMemo(() => {
        if (departments) {
            return departments.data.map((department: Department) => ({value: department.id, label: department.name}))
        }
    }, [departments]);

    const rolesOptions = useMemo(() => {
        return [
            {label: 'Член комиссии', value: Role.Member},
            {label: 'Песок', value: Role.Old},
            {label: 'Админ', value: Role.Admin},
            {label: 'Заместитель', value: Role.Assistant}]
    }, []);

    const createMutation = useMutation(UsersApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    });

    const addHandler = async (values: AddUserFormValue) => {
        try {
            const response = await createMutation.mutateAsync({
                name: values?.name,
                department_id: values?.department_id,
                role: values?.role === Role.Assistant ? Role.Member : values?.role,
                email: values?.email,
                password: values?.password
            });

            if (response.status === 201) {
                setOpen(false);
                reset();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box sx={{marginBottom: '1rem'}}>
                    <Typography variant={'h5'}>Создание пользователя</Typography>
                </Box>
                <form onSubmit={handleSubmit(addHandler)}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem', width: "auto"}}>
                        <TextInput name={'name'} control={control} label={'ФИО'}/>
                        <TextInput name={'email'} control={control} label={'Почта'}/>
                        <AutocompleteInput name={'department_id'} control={control} label={'Комиссия'}
                                           options={departmentsOptions}/>
                        <AutocompleteInput name={'role'} control={control} label={'Должность'} options={rolesOptions}/>
                        <PasswordInput name={'password'} control={control} label={'Пароль'} />
                        <Button size={'small'} type={'submit'} variant={'contained'}>Сохранить</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}