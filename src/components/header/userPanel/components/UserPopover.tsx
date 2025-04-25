import {Box, Divider, Popover, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {RoutesName} from "../../../../enums/routes";
import {useNavigate} from "react-router-dom";
import {DecodedJwt} from "../../../../utils/jwt/DecodedJwt.tsx";

type UserPopoverProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean;
}
export const UserPopover = ({setAnchorEl, open, anchorEl}: UserPopoverProps) => {
    const id = open ? 'user-popover' : undefined;
    const idUser = DecodedJwt()?.id;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const nav = useNavigate()

    const logout = () => {
        localStorage.removeItem('token');
        nav('/login')
    }

    return (<Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            anchorEl={anchorEl}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', padding: '0.5rem'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}} onClick={() => nav(`${RoutesName.User}${idUser}`)}>
                    <AccountCircleIcon />
                    <Typography>Мой профиль</Typography>
                </Box>
                <Divider orientation="horizontal" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                <Box sx={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}} onClick={logout}>
                    <LogoutIcon />
                    <Typography>Выйти</Typography>
                </Box>
            </Box>
        </Popover>

    );
}