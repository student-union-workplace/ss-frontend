import { jwtDecode } from "jwt-decode";
import {JwtPayload} from "../../types/login";

export const DecodedJwt = () => {
    const token = localStorage.getItem('token')

    if (token) {
        const decodedToken: JwtPayload = jwtDecode(token);
        return decodedToken;
    }

    return {
        department_id: '',
        email: '',
        exp: 0,
        iat: 0,
        id: '',
        name: '',
        role: '',
    }
};