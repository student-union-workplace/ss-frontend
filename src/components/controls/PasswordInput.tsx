import {memo, useState} from 'react';

import {Controller} from 'react-hook-form';

import {TextField} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import type {PasswordInputProps} from './types';

export const PasswordInput = memo<PasswordInputProps>(
    ({
         name,
         control,
         label,
         placeholder,
         withGenerator = false,
         withShowPassword = false,
         helperText,
         disabled
     }) => {
        const [type, setType] = useState<'password' | 'text'>('password');


        return (
            <Controller
                name={name}
                control={control}
                render={({field: {onChange, name, value}, formState: {errors}}) => (
                    <TextField
                        value={value}
                        name={name}
                        onChange={onChange}
                        fullWidth
                        label={label}
                        type={type}
                        variant={'outlined'}
                        autoComplete='new-password'
                        aria-autocomplete='none'
                        aria-readonly='true'
                        size={'small'}
                        placeholder={placeholder}
                        disabled={disabled}
                        error={Boolean(errors[name])}
                        helperText={helperText || (errors?.[name] && (errors[name]?.message as string))}
                        InputProps={{
                            endAdornment:
                                withGenerator || withShowPassword ? (
                                    <>
                                        {withShowPassword && (
                                            <InputAdornment position='end' sx={{cursor: 'pointer'}}>

                                                {type === 'text' ? <VisibilityOutlinedIcon
                                                        onClick={() => setType('password')}/> :
                                                    <VisibilityOffOutlinedIcon
                                                        onClick={() => setType( 'text')}/>}

                                            </InputAdornment>
                                        )}
                                    </>
                                ) : undefined
                        }}
                    />
                )}
            />
        );
    }
);
