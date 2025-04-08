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

    static update(body: {id: string}) {
        return instance.post(`/users/${body.id}`, body);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/users/${body.id}`);
    }
}