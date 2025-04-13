import {Box} from "@mui/material";
import {Calendar} from "./components/Calendar.tsx";
import {AddActivityModal} from "./components/AddActivity/AddActivityModal.tsx";
import {useState} from "react";
import {ActivityModal} from "./components/Activity/ActivityModal.tsx";

export const CalendarPage = () => {
    const [openActivity, setOpenActivity] = useState(false);
    const [openAddActivity, setOpenAddActivity] = useState(false);
    const [idActivity, setIdActivity] = useState<string | null>(null);
    return <Box className={'content'}>
        <Calendar  idActivity={idActivity} setIdActivity={setIdActivity}  openActivity={openActivity} openAddActivity={openAddActivity} setOpenActivity={setOpenActivity} setOpenAddActivity={setOpenAddActivity}/>
        <AddActivityModal open={openAddActivity} setOpen={setOpenAddActivity} idActivity={null} setIdActivity={setIdActivity} />
        <ActivityModal open={openActivity} setOpen={setOpenActivity} id={idActivity} setIdActivity={setIdActivity} />
    </Box>
}