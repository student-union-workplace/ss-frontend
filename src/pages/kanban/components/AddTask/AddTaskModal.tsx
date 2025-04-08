import {Box, Modal, Typography} from "@mui/material";
import {TextInput} from "../../../../components/controls/TextInput.tsx";
import {useForm} from "react-hook-form";
import {ADD_TASK_INITIAL_VALUE} from "../../constants.ts";
import {TaskData, TaskFormValues} from "../../../../types/tasks";
import {CustomControl} from "../../../../components/controls/CustomControl";
import {ResponsibleControl} from "./ResponsibleControl.tsx";
import {DateControl} from "./DateControl.tsx";
import {AutocompleteInput} from "../../../../components/controls/AutocompleteInput.tsx";
import Button from "@mui/material/Button";
import {useEffect, useMemo} from "react";
import {useMutation, useQueryClient} from "react-query";
import {TasksApi} from "../../../../api/tasks";

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

type AddTaskModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    task?: TaskData,
}

export const AddTaskModal = ({open, setOpen, task}: AddTaskModalProps) => {
    const queryClient = useQueryClient();
    const handleClose = () => {
        setOpen(false)
    }
    const {control, reset, handleSubmit} = useForm<TaskFormValues>({
        defaultValues: ADD_TASK_INITIAL_VALUE,
    });

    const statusOptions = useMemo(() => {
        return [
            {label: 'Открыта', value: 'open'},
            {label: 'В работе', value: 'at_work'},
            {label: 'На проверке', value: 'review'},
            {label: 'Выполнена', value: 'closed'},
        ]
    }, [])

    const createMutation = useMutation(TasksApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    });

    const updateMutation = useMutation(TasksApi.update, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    });

    const createHandler = async (values: TaskFormValues) => {
        try {
            if (task) {
                const response = await updateMutation.mutateAsync({
                    id: task.id,
                    data: {
                        name: values.name,
                        deadline: values.deadline,
                        description: values.description,
                        status: values.status,
                        user_id: values.user_id
                    }
                });

                if (response.status === 200) {
                    setOpen(false)
                }
            } else {
                const response = await createMutation.mutateAsync({
                    name: values.name,
                    deadline: values.deadline,
                    description: values.description,
                    status: values.status,
                    user_id: values.user_id
                });

                if (response.status === 201) {
                    setOpen(false)
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (task) {
            reset({
                name: task.name,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                user_id: task.user_id
            })
        }
    }, [reset, task]);


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit(createHandler)}>
                <Box sx={style}>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '30px',
                        width: '100%',
                    }}>
                        <Typography sx={{fontSize: '24px'}}>
                            Задача
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px', width: '100%',
                        }}>
                            <TextInput name={'name'} control={control} label={'Текст задачи*'}/>
                            <CustomControl
                                name={'user_id'}
                                control={control}
                                Component={ResponsibleControl}
                                label={"Выполняющий*"}
                            />

                        </Box>
                        <TextInput name={'description'} control={control} label={'Описание задачи'} multiline={true}
                                   rows={5}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px', width: '100%',
                        }}>
                            <Box sx={{width: '100%'}}>
                                <CustomControl
                                    name={'deadline'}
                                    control={control}
                                    Component={DateControl}
                                />
                            </Box>


                            <AutocompleteInput name={'status'} control={control} label={'Статус задачи*'}
                                               options={statusOptions}/>
                        </Box>

                        <Button variant={'contained'} sx={{width: '100%'}}
                                type={'submit'}>{task ? 'Сохранить' : 'Создать'}</Button>
                    </Box>

        </Box>
            </form>
</Modal>
)
}