import type { ReactNode } from 'react';

import type { Control } from 'react-hook-form';
import type { ButtonProps, AutocompleteProps as MuiAutocompleteProps } from '@mui/material';

export type ControlProps = {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: () => void
};

export type TextInputProps = ControlProps & {
  type?: 'text' | 'password';
  startText?: string;
  endText?: string;
  multiline?: boolean;
  rows?: number
};

export type PasswordInputProps = ControlProps & {
  withGenerator?: boolean;
  withShowPassword?: boolean;
  helperText?: ReactNode;
};

export type OptionValue = {
  label: string;
  value: string;
};

export type AutocompleteProps = ControlProps & {
  options: OptionValue[];
  noOptionsText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  filterOptions?: MuiAutocompleteProps<any, any, any, any>['filterOptions'];
  onBlur?: () => void
};

export type SelectValue = {
  label: string;
  value: string;
};

export type SelectBoxProps = ControlProps & {
  options: SelectValue[];
};

export type SubmitButtonProps = {
  text: string;
  loading?: boolean;
  loadingText?: string;
  buttonProps?: ButtonProps;
};
