import {instance} from "../index.ts";
import {TaskFormValues} from "../../types/tasks";
import { stringify } from 'qs';

export class TasksApi {
    static get(body: {event_name?: string | null, user_name?: string | null, is_mine?: boolean}) {
        const queryParams = stringify(body);
        return instance.get(`/tasks?${queryParams}`);
    }

    static getTask(body: {id: string}) {
        return instance.get(`/tasks/${body.id}`);
    }

    static create(body: TaskFormValues) {
        return instance.post(`/tasks`, body);
    }

    static update(body: {id: string, data: TaskFormValues}) {
        return instance.patch(`/tasks/${body.id}`, body.data);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/tasks/${body.id}`);
    }
}