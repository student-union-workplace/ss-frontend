import {Box} from "@mui/material";
import {Calendar} from "./components/Calendar.tsx";
import {AddActivityModal} from "./components/AddActivity/AddActivityModal.tsx";
import {useState} from "react";

export const CalendarPage = () => {
    const [open, setOpen] = useState(false);
    const [idActivity, setIdActivity] = useState<string | null>(null);
    return <Box className={'content'}>
        <Calendar open={open} setOpen={setOpen} idActivity={idActivity} setIdActivity={setIdActivity} />
        <AddActivityModal open={open} setOpen={setOpen} idActivity={idActivity} />
    </Box>
}