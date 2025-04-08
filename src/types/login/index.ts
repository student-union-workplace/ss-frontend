export type Login = {
    email: string,
    password: string
}

export type JwtPayload = {
    department_id: string;
    email: string;
    exp: number;
    iat: number;
    id: string;
    name: string;
    role: string;
} | null;
