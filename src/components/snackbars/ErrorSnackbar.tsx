import {Alert, Snackbar} from "@mui/material";


type ErrorSnackbarProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    message: string
}
export const ErrorSnackbar = ({setOpen, open, message}: ErrorSnackbarProps) => {

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{horizontal: "right", vertical: 'bottom'}}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="outlined"
                sx={{width: '100%'}}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}