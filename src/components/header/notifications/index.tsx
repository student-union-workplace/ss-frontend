import {Box, Popover} from "@mui/material";
import {NotificationItem} from "./components/NotificationItem.tsx";
import {NotificationsApi} from "../../../api/notifications";
import {useQuery} from "react-query";
import {Notification} from "../../../types/notifications";

type NotificationsProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean;
}
export const Notifications = ({setAnchorEl, open, anchorEl}: NotificationsProps) => {
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { data: notificationsData, isLoading } = useQuery(
        'notifications',
        () => NotificationsApi.get(),
        { refetchOnWindowFocus: false }
    );

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
            {!isLoading && <Box sx={{paddingBlock: '10px', width: '450px', maxHeight: '270px', overflowY: 'auto'}}>
                {notificationsData && notificationsData?.data?.map((item: Notification) => {
                    return <NotificationItem item={item} key={item.title} setAnchorEl={setAnchorEl}/>
                })}
            </Box>}
        </Popover>

    )
}