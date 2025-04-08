import {instance} from "../index.ts";
import {LocationFormValues} from "../../types/locations";

export class LocationsApi {
    static get() {
        return instance.get(`/locations`);
    }

    static getLocation(body: {id: string}) {
        return instance.get(`/locations/${body.id}`);
    }

    static create(body: LocationFormValues) {
        return instance.post(`/locations`, body);
    }

    static update(body: {id: string}) {
        return instance.post(`/locations/${body.id}`, body);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/locations/${body.id}`);
    }
}