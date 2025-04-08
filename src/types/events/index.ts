export type EventFormValues = {
    "name": string,
    "description": string,
    "date": string | null,
    "is_archived": boolean,
    "past_event_id": string,
    "theme_id": string,
    "managers": string[],
    "users": string[],
    "locations": string[]
}

export type EventUpdateFormValues = {
    "name"?: string,
    "description"?: string,
    "date"?: string | null,
    "is_archived"?: boolean,
    "past_event_id"?: string,
    "theme_id"?: string,
    "managers"?: string[],
    "users"?: string[],
    "locations"?: string[]
}

export type User = {
    "id": string,
    "name": string
}

export type Theme = {
    "id": string,
    "name": string
}

export type Location = {
    "id": string,
    "name": string,
    "address": string
}

export type EventData = {
    "id": string,
    "name": string,
    "description": string,
    "date": string,
    "is_archived": boolean,
    "created_at": string,
    "updated_at": string,
    "past_event_id": string | null,
    "theme_id": string,
    "users": User[],
    "managers": User[],
    "locations": Location[]
    "theme": Theme
}