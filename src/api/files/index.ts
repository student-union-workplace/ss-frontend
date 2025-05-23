import {instance} from "../index.ts";

export class FilesApi {
    // Google files

    // Google docs
    static addGoogleDoc(body: {title: string}) {
        return instance.post(`/google-docs`, body);
    }

    static addGoogleDocForEvent(body: {title: string, eventId: string}) {
        return instance.post(`/google-docs/event`, body);
    }

    static deleteGoogleDoc(body: {fileId: string}) {
        return instance.delete(`/google-docs?fileId=${body.fileId}`);
    }

    // Google sheets
    static addGoogleSheet(body: {title: string}) {
        return instance.post(`/google-sheets`, body);
    }

    static addGoogleSheetForEvent(body: {title: string, eventId: string}) {
        return instance.post(`/google-sheets/event`, body);
    }

    static deleteGoogleSheet(body: {fileId: string}) {
        return instance.delete(`/google-sheets?fileId=${body.fileId}`);
    }

}