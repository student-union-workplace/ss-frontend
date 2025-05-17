import {Box, FormControlLabel, Popover, Radio, RadioGroup} from "@mui/material";
import {FormControl} from "@mui/base";
import {Role} from "../../../../enums/roles";
import {useQuery} from "react-query";
import {DepartmentsApi} from "../../../../api/departments";

type DepartmentPopoverProps = {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
    open: boolean;
    department: Role | null;
    setDepartment: () => void;
}
export const DepartmentPopover = ({ setAnchorEl, open, anchorEl, department, setDepartment}: DepartmentPopoverProps) => {
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepartment((event.target as HTMLInputElement).value);
        setAnchorEl(null);
    };

    const {data: departments} = useQuery('departments', () => DepartmentsApi.get(), {refetchOnWindowFocus: false})

console.log(departments)
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
                        value={department}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={null} control={<Radio />} label="Все" />
                        {departments?.data?.map(department => {
                                return <FormControlLabel value={department.name} control={<Radio/>} label={department.name}/>
                            }
                        )}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Popover>
    )
}