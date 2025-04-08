import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage";
import {RegisterPage} from "./pages/auth/RegisterPage";
import {RoutesName} from "./enums/routes";
import {KanbanPage} from "./pages/kanban";
import {AuthRouter} from "./utils/routes/AuthRouter.tsx";
import {NotAuthRouter} from "./utils/routes/NotAuthRouter.tsx";
import {Header} from "./components/header";
import {AddEvent} from "./pages/events/addEvent";
import {Event} from "./pages/events/event";
import {Events} from "./pages/events/events";
import {CalendarPage} from "./pages/calendar";
import {UserPage} from "./pages/users/user";
import {UsersPage} from "./pages/users/users";
import {QueryClient, QueryClientProvider} from "react-query";
import {Role} from "./enums/roles";

const queryClient = new QueryClient();

function App() {
    const auth = !!localStorage.getItem('token')
    console.log(auth)

    return (
        <>
            <Header/>
            <QueryClientProvider client={queryClient}><Routes>
                <Route path={RoutesName.Kanban} element={<AuthRouter roles={[Role.Admin, Role.Member, Role.Old]}><KanbanPage/></AuthRouter>}/>
                <Route path={RoutesName.Calendar} element={<AuthRouter roles={[Role.Admin, Role.Member, Role.Old]}><CalendarPage/></AuthRouter>}/>
                <Route path={RoutesName.Login} element={<NotAuthRouter><LoginPage/></NotAuthRouter>}/>
                <Route path={RoutesName.Register} element={<NotAuthRouter><RegisterPage/></NotAuthRouter>}/>
                <Route path={RoutesName.AddEvent} element={<AuthRouter roles={[Role.Admin, Role.Member]}><AddEvent /></AuthRouter>}/>
                <Route path={`${RoutesName.Event}:id`} element={<AuthRouter roles={[Role.Admin, Role.Member, Role.Old]}><Event /></AuthRouter>}/>
                <Route path={RoutesName.Events} element={<AuthRouter roles={[Role.Admin, Role.Member, Role.Old]}><Events /></AuthRouter>}/>
                <Route path={`${RoutesName.User}:id`} element={<AuthRouter roles={[Role.Admin, Role.Member, Role.Old]}><UserPage /></AuthRouter>}/>
                <Route path={RoutesName.Users} element={<AuthRouter roles={[Role.Admin, Role.Member, Role.Old]}><UsersPage /></AuthRouter>}/>
            </Routes></QueryClientProvider>
        </>
    )
}

export default App
