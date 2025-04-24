import {Divider, Grid} from "@mui/material";
import {Profile} from "./components/Profile.tsx";
import {Events} from "./components/Events.tsx";

export const UserPage = () => {
    return <Grid className={'content'} container spacing={2} sx={{display: "flex", justifyContent: "space-between"}}>
        <Grid item md={5}>
            <Profile />
        </Grid>
        <Divider orientation="vertical" variant="fullWidth" flexItem
                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginInline: '1rem'}}/>
        <Grid item md={5}>
            <Events />
        </Grid>
    </Grid>;
}