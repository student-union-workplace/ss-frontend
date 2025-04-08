import {Box, IconButton, Modal, Typography} from "@mui/material";
import {AutocompleteInput} from "../../../../components/controls/AutocompleteInput.tsx";
import {useMemo} from "react";
import {TextInput} from "../../../../components/controls/TextInput.tsx";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type AddDocumentModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    control: never;
    name: string
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 335,
    bgcolor: '#F4FEFF',
    borderRadius: '20px',
    boxShadow: 24,
    p: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'space-between'
};

export const AddDocumentModal = ({setOpen, open, control, name}: AddDocumentModalProps) => {
    const handleClose = () => {
        setOpen(false)
    }

    const typesDocument = useMemo(() => {
        return [
            {label: 'Гугл таблица', value: 'xls'},
            {label: 'Гугл документ', value: 'doc'},
            {label: 'Свой документ', value: 'other'},
        ]
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    minWidth: '300px'
                }}>
                    <Typography variant={'subtitle1'}>
                        Добавление документа
                    </Typography>
                    <AutocompleteInput name={name} control={control} label={'Тип документа'} options={typesDocument}/>
                    <TextInput name={name} control={control} label={'Название документа'}/>
                    <TextInput name={name} control={control} label={'Добавить файл'}/>
                </Box>
                <IconButton color={'primary'}>
                    <CheckCircleOutlineIcon/>
                </IconButton>
            </Box>
        </Modal>
    )
}