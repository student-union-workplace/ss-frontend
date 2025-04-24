import {Divider, Grid} from "@mui/material";
import {Profile} from "./components/Profile.tsx";
import {Events} from "./components/Events.tsx";

export const UserPage = () => {
    return <Grid className={'content'}  sx={{display: "flex", justifyContent: "space-between"}}>
        <Profile />
        <Divider orientation="vertical" variant="fullWidth" flexItem
                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginInline: '1rem'}}/>
        <Events />
    </Grid>;
}