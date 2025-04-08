import React, {useMemo} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {Chip, TextField} from '@mui/material';
import {useQuery} from "react-query";
import {LocationsApi} from "../../../../api/locations";
import {LocationData} from "../../../../types/locations";


export type AutocompleteControlProps = {
    value: string[];
    onChange: (value: string[]) => void;
    onBlur: () => void;
    label: string
};

export const PlaceControl = ({value, onChange, onBlur, label}: AutocompleteControlProps) => {

    const {data: places} = useQuery(
        ['places'],
        () => LocationsApi.get(),
        {refetchOnWindowFocus: false}
    );

    console.log(value)
    const placesValues = useMemo(() => {
        if (places?.data) {
            return places.data.filter((place: LocationData) => value?.map((val) => val.id).indexOf(place.id) !== -1) ?? [];
        }
    }, [places, value]);

    const onChangePlaces = (_: React.SyntheticEvent, newValue: {title: string, id: string}[]) => {
        if (!newValue) {
            return;
        }

        value = newValue.map(number => number.id);
        onChange(newValue);
    };

    return (
        placesValues && (
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
                options={places?.data ?? []}
                getOptionLabel={(option) => option.name}
                value={placesValues}
                size={'small'}
                fullWidth
                multiple={true}
                onChange={onChangePlaces}
                noOptionsText={'Ничего не найдено'}
                renderTags={(value, getTagProps) => value.map((option, index) => {
                    const {key, ...tagProps} = getTagProps({index})
                    return (
                        <Chip variant={'outlined'} label={option.name} key={key} {...tagProps} size={'small'}/>
                    )
                })}

            />
        )
    );
};
