import {Avatar, Badge, Box, IconButton, Typography} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Notifications} from "../notifications";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../../enums/routes";
import {useQuery} from "react-query";
import {NotificationsApi} from "../../../api/notifications";

export const UserPanel = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const nav = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const { data: notificationsData, isLoading } = useQuery(
        'notifications',
        () => NotificationsApi.get(),
        { refetchOnWindowFocus: false }
    );

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', position: 'relative'}}>
            <Badge badgeContent={!isLoading && notificationsData?.data?.length?.toString()} color="error" overlap="circular">
                <IconButton onClick={handleClick} color={'inherit'}>
                    <NotificationsNoneIcon fontSize={'large'}/>
                </IconButton>
            </Badge>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '7px'}}>

                <Avatar sx={{bgcolor: '#1DB8CA', width: '35px', height: '35px', cursor: 'pointer'}}
                        onClick={() => nav(`${RoutesName.User}1`)}>РГ</Avatar>
                <Typography variant={'body2'} sx={{fontSize: '24px'}}>Рома Г.</Typography>
            </Box>
            <Notifications open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </Box>
    )
}