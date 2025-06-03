import {Box, FormControlLabel, FormGroup, Popover} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

type StatusPopoverProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean;
    isArchived: boolean;
    setIsArchived: (isArchived: boolean | null) => void;
}
export const StatusPopover = ({ setAnchorEl, open, anchorEl, isArchived, setIsArchived}: StatusPopoverProps) => {
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeInWork = () => {
        setIsArchived(isArchived === false ? null : false);
        setAnchorEl(null);
    }
    const handleChangeArchived = () => {
        setIsArchived(isArchived ? null : true);
        setAnchorEl(null);
    }

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
                    <FormControlLabel control={<Checkbox checked={isArchived === false}
                                                         onChange={handleChangeInWork}/>} label="В работе"  />
                    <FormControlLabel control={<Checkbox checked={isArchived === true} onChange={handleChangeArchived}/>} label="Архив"  />
                </FormGroup>
            </Box>
        </Popover>
    )
}