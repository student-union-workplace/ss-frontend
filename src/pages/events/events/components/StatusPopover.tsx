import {Box, FormControlLabel, FormGroup, Popover} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useState} from "react";

type StatusPopoverProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean
}
export const StatusPopover = ({ setAnchorEl, open, anchorEl}: StatusPopoverProps) => {
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [active, setActive] = useState(false)
    const [done, setDone] = useState(false)
    const [archive, setArchive] = useState(false)

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
            <Box sx={{paddingLeft: '20px', paddingBlock: '10px', width: '160px', }}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={active} onChange={(_, value) => setActive(value)}/>} label="В работе"  />
                    <FormControlLabel control={<Checkbox checked={done} onChange={(_, value) => setDone(value)}/>} label="Завершено"  />
                    <FormControlLabel control={<Checkbox checked={archive} onChange={(_, value) => setArchive(value)}/>} label="Архив"  />
                </FormGroup>
            </Box>
        </Popover>
    )
}