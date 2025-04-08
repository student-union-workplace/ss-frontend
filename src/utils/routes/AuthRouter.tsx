import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {RoutesName} from "../../enums/routes";
import {DecodedJwt} from "../jwt/DecodedJwt.tsx";
import {Role} from "../../enums/roles";

type AuthRouterProps = {
    children?: ReactNode,
    roles?: Role[]
}

export const AuthRouter = ({ roles, children}: AuthRouterProps) => {
    const auth = !!localStorage.getItem('token')
    const role = DecodedJwt().role;

    return auth ? (
        roles?.includes(role) ? (children) : <Navigate to={RoutesName.Kanban}/>
    ) : <Navigate to={RoutesName.Login}/>
}