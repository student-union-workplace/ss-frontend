import React, { useMemo } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {Avatar, Chip, TextField} from '@mui/material';
import {useQuery} from "react-query";
import {UsersApi} from "../../../../api/users";
import {User} from "../../../../types/events";


export type AutocompleteControlProps = {
  value: string[];
  onChange: (value: string[]) => void;
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
    if (users?.data?.data) {
      return users?.data?.data.filter((user: User) => value.map((val) => val.id).indexOf(user.id) !== -1) ?? [];
    }
  }, [users, value]);

  const onChangeResponsible = (_: React.SyntheticEvent, newValue: {name: string, id: string}[]) => {
    if (!newValue) {
      return;
    }

    value = newValue.map(user => user.id);
    onChange(newValue);
  };

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
        value={usersValues}
        size={'small'}
        fullWidth
        multiple={true}
        onChange={onChangeResponsible}
        noOptionsText={'Ничего не найдено'}
        renderTags={(value, getTagProps) => value.map((option, index) => {
          const {key, ...tagProps} = getTagProps({index})
          const label = option.name.split(' ')[0] + ' ' + option.name.split(' ')[1].split('')[0] + '.'
          return(
              <Chip variant={'outlined'} label={label} key={key} {...tagProps} avatar={<Avatar>OP</Avatar>} size={'small'}/>
          )
        })}
      />
    )
  );
};
