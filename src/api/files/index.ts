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

    static updateGoogleDoc(body: {name: string, id: string}) {
        return instance.patch(`/google-docs/${body.id}`, {name: body.name});
    }

    // Google sheets
    static addGoogleSheet(body: {title: string}) {
        return instance.post(`/google-sheets`, body);
    }

    static addGoogleSheetForEvent(body: {title: string, eventId: string}) {
        return instance.post(`/google-sheets/event`, body);
    }

    static deleteDocument(body: {fileId: string}) {
        return instance.delete(`/files/${body.fileId}`);
    }

    static updateGoogleSheet(body: {name: string, id: string}) {
        return instance.patch(`/google-sheets/${body.id}`, {name: body.name});
    }

    // Other files
    static addInfoOtherFile(body: {eventId: string, file: File}) {
        return instance.post(`/files/events/${body.eventId}/files/upload-url`, {
            name: body.file.name,
            type: body.file.type,
            size: body.file.size,
            }
        );
    }

    static addOtherFile(body: {uploadUrl: string, file: File}) {
        return instance.put(`${body.uploadUrl}`, body.file);
    }

}