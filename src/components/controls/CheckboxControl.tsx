import React, { memo } from 'react';

import { Controller } from 'react-hook-form';

import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import type { ControlProps } from '@components/controls/types';

export const CheckboxControl = memo<ControlProps>(({ name, control, label }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => <Checkbox checked={value} onChange={(event: React.ChangeEvent<HTMLInputElement>, value) => onChange(value)} />}
      />
      <Typography>{label}</Typography>
    </Box>
  );
});
