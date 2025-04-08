import {instance} from "../index.ts";
import {ActivityFormValues} from "../../types/activities";

export class ActivitiesApi {
    static get(body: {year: string}) {
        return instance.get(`/activities?year=${body.year}`);
    }

    static getActivity(body: {id: string}) {
        return instance.get(`/activities/${body.id}`);
    }

    static changeStatus(body: {id: string}) {
        return instance.patch(`/activities/${body.id}/changeStatus`);
    }

    static create(body: ActivityFormValues) {
        return instance.post(`/activities`, body);
    }

    static update(body: {id : string, data: ActivityFormValues}) {
        return instance.patch(`/activities/${body.id}`, {
            date: body.data.date,
            name: body.data.name,
            description: body.data.description,
            location_id: body.data.location_id,
            users: body.data.users,
        });
    }

    static delete(body: {id: string}) {
        return instance.delete(`/activities/${body.id}`);
    }
}