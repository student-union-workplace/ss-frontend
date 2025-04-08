import { memo } from 'react';

import { Controller } from 'react-hook-form';

import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import {AutocompleteProps, OptionValue} from "./types.ts";


const defaultFilterOptions = createFilterOptions<OptionValue>({
  matchFrom: 'any',
  trim: true,
  stringify: option => option.label + option.value
});

export const AutocompleteInput = memo<AutocompleteProps>(
  ({
    name,
    control,
    label,
    options,
    placeholder,
    noOptionsText = 'Не найдено',
    disabled,
    isLoading,
    filterOptions, onBlur
  }) => {
    if (isLoading) {
      return <TextField disabled fullWidth label={label} value='Загрузка списка...' />;
    }

      console.log(options)
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, name, value }, formState: { errors } }) => (
          <Autocomplete<OptionValue>
            disabled={disabled}
            disablePortal
            fullWidth
            size={'small'}
            value={options?.find(item => item.value == value) ?? null}
            options={options}
            onChange={(_, newValue) => {
              onChange(newValue?.value ?? null);
            }}
            noOptionsText={noOptionsText}
            autoHighlight={true}
            filterOptions={filterOptions ?? defaultFilterOptions}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                autoComplete='off'
                aria-autocomplete='none'
                error={!!errors[name]}
                helperText={errors?.[name] && (errors[name]?.message as string)}
                placeholder={placeholder}
                sx={{fontSize: '16px'}}
              />
            )}
            onBlur={onBlur}
          ></Autocomplete>
        )}
      />
    );
  }
);
