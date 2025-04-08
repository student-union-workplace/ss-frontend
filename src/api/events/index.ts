import {instance} from "../index.ts";
import {EventFormValues, EventUpdateFormValues} from "../../types/events";

export class EventsApi {
    static get(body: {page: number, take: number}) {
        return instance.get(`/events?page=${body.page}&take=${body.take}`);
    }

    static getEvent(body: {id: string}) {
        return instance.get(`/events/${body.id}`);
    }

    static changeStatus(body: {id: string}) {
        return instance.patch(`/events/${body.id}/changeStatus`);
    }

    static create(body: EventFormValues) {
        return instance.post(`/events`, body);
    }

    static update(body: {id : string, data: EventUpdateFormValues}) {
        return instance.patch(`/events/${body.id}`, body.data);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/events/${body.id}`);
    }
}