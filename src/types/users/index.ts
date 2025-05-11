import {Role} from "../../enums/roles";

export type UserData = {
    "id": string,
    "name": string,
    "email": string,
    "role": Role,
    "department_id": string,
    "department": Department,
    "isDepartmentHead": boolean,
    phone_number: string | null,
    vk_link: string | null,
    tg_link: string | null,
};


export type Department = {
    "id": string,
    "name": string,
    head_user_id: string,
};

export type UserFormValues = {
    "name": string,
    "email": string,
    "role": string,
    "department_id": string,
    phone_number: string | null,
    vk_link: string | null,
    tg_link: string | null,
}

export type AddUserFormValue = {
    "name": string,
    "role": Role,
    "department_id": string,
}