import { useMemo } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from '@mui/material';
import {UsersApi} from "../../../../api/users";
import {useQuery} from "react-query";
import {UserData} from "../../../../types/users";


export type AutocompleteControlProps = {
  value: string | null;
  onChange: (value: string| null) => void;
  onBlur: () => void;
  label: string
};

export const ResponsibleControl = ({value, onChange, onBlur, label}: AutocompleteControlProps) => {
    const {data: users} = useQuery(
        ['users'],
        () => UsersApi.get({page: 1, take: 1000}),
        {refetchOnWindowFocus: false}
    );

  const usersValues = useMemo(() => {
    return users?.data?.data.filter((user: UserData) => value?.indexOf(user.id) !== -1) ?? [];
  }, [users, value]);


  return (
      usersValues && (
      <Autocomplete
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            autoComplete='off'
            aria-autocomplete='none'
            onBlur={onBlur}
          />
        )}
        options={users?.data?.data ?? []}
        getOptionLabel={(option) => option.name}
        value={users?.data?.data?.find((item: UserData) => item.id == value) ?? null}
        size={'small'}
        fullWidth
        onChange={(_, newValue) => {
          onChange(newValue?.id ?? null);
        }}
        noOptionsText={'Ничего не найдено'}

      />
    )
  );
};
