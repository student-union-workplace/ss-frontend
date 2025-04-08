import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";

import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import { ru } from 'date-fns/locale'

export type AutocompleteControlProps = {
    value?: Date | null;
    onChange: (date: Date | null) => void;
    onBlur?: () => void
};

export const DateControl = ({value, onChange,onBlur }: AutocompleteControlProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru} >
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker value={value ? new Date(value) : null} onChange={onChange} slotProps={{textField: {size: 'small',  placeholder: 'ДД.ММ.ГГГГ ЧЧ:ММ' }}}
                                ampm={false} format={'dd.MM.yyyy HH:mm'} onClose={onBlur} closeOnSelect={true} />
            </DemoContainer>
        </LocalizationProvider>
    );
};
