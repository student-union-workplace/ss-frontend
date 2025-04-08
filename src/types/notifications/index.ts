export type Notification = {
    "id": string,
    "title": string,
    "description": string,
    "deadline": string | null,
    "type": "task" | "deadline" | "event" | "activity",
    "created_at": string,
    "updated_at": string,
    "event_id": string | null,
    "task_id": string | null,
    "activity_id": string | null,
    "user_id": string
}