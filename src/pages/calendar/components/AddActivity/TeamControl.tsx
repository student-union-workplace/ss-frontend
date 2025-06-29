import React, {useMemo} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {Avatar, Box, Chip, TextField} from '@mui/material';
import {useQuery} from "react-query";
import {UsersApi} from "../../../../api/users";
import {UserData} from "../../../../types/users";
import {User} from "../../../../types/events";

export type AutocompleteControlProps = {
    value: string[];
    onChange: (value: string[]) => void;
    onBlur: () => void;
    label: string
};

export const TeamControl = ({value, onChange, onBlur, label}: AutocompleteControlProps) => {
    const {data: users} = useQuery(
        ['users'],
        () => UsersApi.get({page: 1, take: 50}),
        {refetchOnWindowFocus: false}
    );

    const usersValues = useMemo(() => {
        if (!value) {
            return []
        }

        if (users?.data?.data) {
            return users?.data?.data
                .filter((user: User) => value
                    ?.map((val) => val.id)
                    .indexOf(user.id) !== -1)
                    .map(user => ({name: user.name, id: user.id}) )
                ?? [];
        }
    }, [users, value]);

    const onChangeTeam = (_: React.SyntheticEvent, newValue: { name: string, id: string }[]) => {
        if (!newValue) {
            return;
        }

        console.log(newValue.findIndex(user => user.id == 'all') !== -1)

        if (newValue.findIndex(user => user.id == 'all') !== -1) {
            onChange(users?.data?.data?.map(user => ({name: user.name, id: user.id})))
            return;
        }

        onChange(newValue);
    };

    const handleDelete = (id: string) => {
        const newValue = value?.filter((value) => value.id !== id)
        console.log(value)
        onChange(newValue)
    }

    const teamOptions = [{name: 'Все', id: 'all'}, ...users?.data?.data?.map(user => ({name: user.name, id: user.id})) ?? []]

    return (
        usersValues && (
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
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
                    options={teamOptions ?? []}
                    value={usersValues}
                    size={'small'}
                    fullWidth
                    getOptionLabel={(option) => option.name}
                    multiple={true}
                    onChange={onChangeTeam}
                    noOptionsText={'Ничего не найдено'}
                    limitTags={0}
                    disableCloseOnSelect
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />

                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '242px', overflowY: 'auto'}}>
                    {usersValues.map((user: UserData) => {
                        return <Chip label={user.name} avatar={<Avatar>{user.name.split('')[0]}</Avatar>}
                                     onDelete={() => handleDelete(user.id)}  variant={'outlined'} style={{borderColor: '#1FD4E9'}}/>
                    })}
                </Box>
            </Box>

        )
    );
};
