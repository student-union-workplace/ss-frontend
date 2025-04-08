import {ReactNode} from "react";
import {RoutesName} from "../../enums/routes";
import {Navigate} from "react-router-dom";

type AuthRouterProps = {
    children?: ReactNode
}

export const NotAuthRouter = ({ children}: AuthRouterProps) => {
    const auth = !!localStorage.getItem('token')
    return auth ? <Navigate to={RoutesName.Kanban}/> : (children)
}