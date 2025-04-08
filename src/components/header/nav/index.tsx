import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {RoutesName} from "../../../enums/routes";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import './style.css'
import {useEffect, useState} from "react";

export const Navbar = () => {
    const [activeItem, setActiveItem] = useState<RoutesName>(location.pathname as RoutesName)

    useEffect(() => {
        setActiveItem(location.pathname as RoutesName)
    }, [location.pathname])

    return (
        <Box className={'menu'}>
            <Box className={`menu-item ${activeItem === RoutesName.Kanban && 'active-item'}`}
                 onClick={() => setActiveItem(RoutesName.Kanban)}>

                <Link to={RoutesName.Kanban}>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
                        <CalendarMonthOutlinedIcon/>
                        <Typography fontSize={'20px'}>канбан</Typography>
                    </Box>
                </Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.Events && 'active-item'}`}
                 onClick={() => setActiveItem(RoutesName.Events)}>
                <Link to={RoutesName.Events}><Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
                    <WorkOutlineOutlinedIcon/>
                    <Typography fontSize={'20px'}>меро</Typography>
                </Box></Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.Users && 'active-item'}`}
                 onClick={() => setActiveItem(RoutesName.Users)}>
                <Link to={RoutesName.Users}><Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
                    <PeopleAltOutlinedIcon/>
                    <Typography fontSize={'20px'}>пбшки</Typography>
                </Box></Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.Calendar && 'active-item'}`}
                 onClick={() => setActiveItem(RoutesName.Calendar)}>
                <Link to={RoutesName.Calendar}><Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
                    <CalendarTodayOutlinedIcon/>
                    <Typography fontSize={'20px'}>календарь</Typography>
                </Box></Link>
            </Box>
        </Box>
    )
}
