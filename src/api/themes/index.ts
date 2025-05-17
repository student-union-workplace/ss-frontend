import {instance} from "../index.ts";

export class ThemesApi {
    static get() {
        return instance.get(`/themes`);
    }
}