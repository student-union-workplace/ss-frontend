import type { ControllerProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {CustomControlType} from "./types.ts";


export const CustomControl = ({ control, name, Component, label, onBlur}: CustomControlType) => {
  const render: ControllerProps['render'] = ({
    field: { onChange, value, name },
    formState: { errors }
  }) => {
    return (
      <Component
        onChange={onChange}
        value={value}
        error={!!errors[name]}
        name={name}
        onBlur={onBlur}
        label={label}
      />
    );
  };

  return <Controller render={render} name={name} control={control} />;
};
