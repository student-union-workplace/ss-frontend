import {Box, FormControlLabel, Popover, Radio, RadioGroup} from "@mui/material";
import {FormControl} from "@mui/base";
import {Role} from "../../../../enums/roles";

type RolePopoverProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean;
    role: Role | null;
    setRole: () => void;
}
export const RolePopover = ({ setAnchorEl, open, anchorEl, role, setRole}: RolePopoverProps) => {
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole((event.target as HTMLInputElement).value);
        setAnchorEl(null);
    };


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
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={role}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={null} control={<Radio />} label="Все" />
                        <FormControlLabel value={Role.Admin} control={<Radio />} label="Заместитель" />
                        <FormControlLabel value={Role.Member} control={<Radio />} label="Член ПБ" />
                        <FormControlLabel value={Role.Old} control={<Radio />} label="Песок" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Popover>
    )
}