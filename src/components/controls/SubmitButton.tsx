import {memo} from 'react';

import Button from '@mui/material/Button';

import {CircularProgress} from '@mui/material';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {SubmitButtonProps} from "./types.ts";


const DEFAULT_LOADING_TEXT = 'Loading...';

export const SubmitButton = memo<SubmitButtonProps>(props => {
    const {
        loading, loadingText = DEFAULT_LOADING_TEXT, buttonProps = {}, text
    } = props;

    if (loading) {
        return (
            <Button {...buttonProps}
                    disabled
                    startIcon={<CircularProgress size='small'/>}>
                <Box display='flex'
                     alignItems='center'
                     gap={2}>
                    <CircularProgress size='small'/>
                    <Typography>{loadingText}</Typography>
                </Box>
            </Button>
        );
    }

    return (
        <Button {...buttonProps}
                type='submit'>
            {text}
        </Button>
    );
});
