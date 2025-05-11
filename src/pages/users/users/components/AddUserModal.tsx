import {Box, Modal} from "@mui/material";
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    maxWidth: '600px',
    bgcolor: '#FFF',
    borderRadius: '20px',
    boxShadow: 24,
    p: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
        defaultValues: {name: '', role: '', department_id: ''},
    });

    const {data: departments} = useQuery('departments', () => DepartmentsApi.get(), {refetchOnWindowFocus: false})

    const departmentsOptions = useMemo(() => {
        if (departments) {
            return departments.data.map((department: Department) => ({value: department.id, label: department.name}))
        }
    }, [departments]);

    const rolesOptions = useMemo(() => {
        return [{label: 'Заместитель', value: Role.Admin},{label: 'Член комиссии', value: Role.Member},{label: 'Песок', value: Role.Old}]
    }, []);

    const createMutation = useMutation(UsersApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    const addHandler = async (values: AddUserFormValue) => {
        try {
            const response = await createMutation.mutateAsync({
                    name: values?.name,
                    department_id: values?.department_id,
                    role: values?.role,
            });

            if (response.status === 200) {
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
                <form onSubmit={handleSubmit(addHandler)}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%'}}>
                        <TextInput name={'name'} control={control} label={'ФИО'}/>
                        <AutocompleteInput name={'department_id'} control={control} label={'Комиссия'}
                                           options={departmentsOptions}/>
                        <AutocompleteInput name={'role'} control={control} label={'Должность'} options={rolesOptions}/>
                        <Button size={'small'} type={'submit'} variant={'contained'}>Сохранить</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}