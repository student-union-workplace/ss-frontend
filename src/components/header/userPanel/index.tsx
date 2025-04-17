import {Avatar, Badge, Box, IconButton, Typography} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Notifications} from "../notifications";
import {useState} from "react";
import {useQuery} from "react-query";
import {NotificationsApi} from "../../../api/notifications";
import {UserPopover} from "./components/UserPopover.tsx";

export const UserPanel = () => {
    const [anchorElNotifications, setAnchorElNotifications] = useState<HTMLButtonElement | null>(null);
    const openNotifications = Boolean(anchorElNotifications);
    const [anchorElUserPopover, setAnchorElUserPopover] = useState<HTMLButtonElement | null>(null);
    const openUserPopover = Boolean(anchorElUserPopover);


    const handleClickNotifications = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleClickUserPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
        setAnchorElUserPopover(event.currentTarget);
    };

    const { data: notificationsData, isLoading } = useQuery(
        'notifications',
        () => NotificationsApi.get(),
        { refetchOnWindowFocus: false }
    );

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', position: 'relative'}}>
            <Badge badgeContent={!isLoading && notificationsData?.data?.length?.toString()} color="error" overlap="circular">
                <IconButton onClick={handleClickNotifications} color={'inherit'}>
                    <NotificationsNoneIcon fontSize={'large'}/>
                </IconButton>
            </Badge>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '7px'}}>
                <Avatar sx={{bgcolor: '#1DB8CA', width: '35px', height: '35px', cursor: 'pointer'}}
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent> ) => handleClickUserPopover(event)}>РГ</Avatar>
                <Typography variant={'body2'} sx={{fontSize: '24px'}}>Рома Г.</Typography>
            </Box>
            <Notifications open={openNotifications} anchorEl={anchorElNotifications} setAnchorEl={setAnchorElNotifications}/>
            <UserPopover anchorEl={anchorElUserPopover} setAnchorEl={setAnchorElUserPopover} open={openUserPopover} />
        </Box>
    )
}