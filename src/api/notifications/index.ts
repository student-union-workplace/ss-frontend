import {instance} from "../index.ts";

export class NotificationsApi {
    static get() {
        return instance.get(`/notifications`);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/notifications/${body.id}`);
    }
}