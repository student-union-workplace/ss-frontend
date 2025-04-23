import {instance} from "../index.ts";
import {UserFormValues} from "../../types/users";

export class UsersApi {
    static get(body: {page: number, take: number}) {
        return instance.get(`/users?page=${body.page}&take=${body.take}`);
    }

    static getUser(body: {id: string}) {
        return instance.get(`/users/${body.id}`);
    }

    static create(body: UserFormValues) {
        return instance.post(`/users`, body);
    }

    static update(body: {id: string, data: UserFormValues}) {
        return instance.patch(`/users/${body.id}`, {
            name: body?.data?.name,
            email: body?.data?.email,
            phone_number: body?.data?.phone_number,
            vk_link: body?.data?.vk_link,
            tg_link: body?.data?.tg_link,
            department_id: body?.data?.department_id,
            role: body?.data?.role,
        });
    }

    static delete(body: {id: string}) {
        return instance.delete(`/users/${body.id}`);
    }
}