import { Grid} from "@mui/material";
import {Profile} from "./components/Profile.tsx";
import {Events} from "./components/Events.tsx";

export const UserPage = () => {
    return <Grid className={'content'} container spacing={2}>
        <Grid item md={6}>
            <Profile />
        </Grid>
        <Grid item md={6}>
            <Events />
        </Grid>

    </Grid>;
}