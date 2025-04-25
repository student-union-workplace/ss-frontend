import {instance} from "../index.ts";

export class DepartmentsApi {
    static get() {
        return instance.get(`/departments`);
    }
}