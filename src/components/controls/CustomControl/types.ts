import type { ComponentType } from 'react';

import type { Control } from 'react-hook-form';

export type CustomControlType = {
  name: string;
  control: Control<any>;
  Component: ComponentType<{
    onChange: any;
    error: boolean;
    value: any;
    onBlur?: () => void;
    name?: string;
    label?: string
  }>;
  onBlur?: () => void;
  label?: string
};
