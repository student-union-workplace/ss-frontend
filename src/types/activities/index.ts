export type ActivityData = {
"id": string,
    "name": string,
    "date": string
}

export type ActivityFormValues = {
    "name": string,
    "description"?: string,
    "date": string | null,
    "location_id"?: string,
    "users": string[],
    id?: string
}