import React, { memo } from 'react';

import { NumericFormat } from 'react-number-format';
import { Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

import type { ControlProps } from '@components/controls/types';

export const PhoneInput = memo<ControlProps>(
  ({ name, control, label, placeholder, disabled = false }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, name, value }, formState: { errors } }) => (
          <NumericFormat
            name={name}
            maxLength={18}
            value={value}
            onChange={onChange}
            customInput={TextField}
            fullWidth
            size={'small'}
            label={label}
            variant='outlined'
            error={Boolean(errors[name])}
            helperText={errors?.[name] && (errors[name]?.message as string)}
            autoComplete='off'
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      />
    );
  }
);
