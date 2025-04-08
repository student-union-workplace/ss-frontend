export type UserData = {
    "id": string,
    "name": string,
    "email": string,
    "role": string,
    "department_id": string,
    "department": Department[],
    "isDepartmentHead": boolean
}

export type Department = {
        "id": string,
        "name": string
}

export type UserFormValues = {
    "name": string,
    "email": string,
    "role": string,
    "password": string,
    "department_id": string
}