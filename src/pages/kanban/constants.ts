import {TaskFormValues} from "../../types/tasks";

export const ADD_TASK_INITIAL_VALUE: TaskFormValues = {
    name: "",
    description: "",
    deadline: null,
    user_id: null,
    status: 'open'
}