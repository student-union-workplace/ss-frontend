export type TaskFormValues = {
    name?: string;
    description?: string;
    deadline?: string | null;
    user_id?: string;
    status?: 'open' | 'at_work' | 'review' | 'closed'
}

export type TaskData = {
    "id": string,
    "name": string,
    "priority": number,
    "description": string,
    "deadline": string,
    "status": "open" | "at_work" | "review" | "closed",
    "created_at": string,
    "updated_at": string,
    "event_id": string,
    "user_id": string,
    "event": {
        "id": string,
        "name": string
    },
    "user": {
        "id": string,
        "name": string
    }
}