import {Box, Typography} from "@mui/material";
import {Navbar} from "./nav";
import {UserPanel} from "./userPanel";
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../enums/routes";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export const Header = () => {
    const navigate = useNavigate()
    const auth = !!localStorage.getItem('token')

    if (!auth) {
        return null;
    }
    return (
        <QueryClientProvider client={queryClient}><Box className={'content'} sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBlock: '25px',
        }}>
            <Box onClick={() => navigate(RoutesName.Kanban)} sx={{cursor: 'pointer'}}>
                <Typography variant={'h4'}>ПБитрикс</Typography>
            </Box>
            <Navbar/>
            <UserPanel/>
        </Box></QueryClientProvider>
    )
}