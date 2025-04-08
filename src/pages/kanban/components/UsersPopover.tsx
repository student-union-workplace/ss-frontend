import {Box, FormControlLabel, FormGroup, Popover} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useQuery} from "react-query";
import {UsersApi} from "../../../api/users";
import {UserData} from "../../../types/users";

type StatusPopoverProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean,
    userName: string | null,
    setUserName: (name: string | null) => void
}
export const UsersPopover = ({setAnchorEl, open, anchorEl, userName, setUserName}: StatusPopoverProps) => {
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {data: users} = useQuery(
        ['users'],
        () => UsersApi.get({page: 1, take: 1000}),
        {refetchOnWindowFocus: false}
    );

    console.log(userName)
    return (
        <Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            anchorEl={anchorEl}
        >
            <Box sx={{paddingLeft: '20px', paddingBlock: '10px'}}>
                <FormGroup>
                    {users?.data?.data?.map((user: UserData) =>
                         <FormControlLabel control={<Checkbox checked={user?.name === userName}
                    onChange={() => setUserName(user?.name === userName ? null : user?.name)}/>} label={user?.name}/>
            )}
        </FormGroup>
</Box>
</Popover>
)
}