import {Box, IconButton, Modal, TextField, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Autocomplete from "@mui/material/Autocomplete";
import {useMutation, useQueryClient} from "react-query";
import {FilesApi} from "../../../../api/files";

type AddDocumentModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    idEvent?: string;
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

export const AddDocumentModal = ({setOpen, open, idEvent}: AddDocumentModalProps) => {
    const [typeDocument, setTypeDocument] = useState<{label: string, value: string} | null>(null);
    const [fileName, setFileName] = useState('');
    const queryClient = useQueryClient();

    const handleClose = () => {
        setOpen(false)
    }

    const typesDocument = useMemo(() => {
        return [
            {label: 'Гугл таблица', value: 'sheet'},
            {label: 'Гугл документ', value: 'doc'},
            {label: 'Свой документ', value: 'other'},
        ]
    }, [])

    const createGoogleDocMutation = useMutation(FilesApi.addGoogleDocForEvent, {
        onSuccess: () => {
            queryClient.invalidateQueries('event');
            queryClient.removeQueries('event');
            queryClient.invalidateQueries('event');
        }
    });

    const createGoogleSheetMutation = useMutation(FilesApi.addGoogleSheetForEvent, {
        onSuccess: () => {
            queryClient.invalidateQueries('event');
        }
    });

    const createFileHandler = async (e) => {
        e.preventDefault();
        try {
            if (typeDocument?.value === 'doc') {
                await createGoogleDocMutation.mutateAsync({
                    title: fileName,
                    eventId: idEvent,
                });
            }

            if (typeDocument?.value === 'sheet') {
                await createGoogleSheetMutation.mutateAsync({
                    title: fileName,
                    eventId: idEvent,
                });
            }
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    }

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
                    <Autocomplete
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={'Тип документа'}
                                autoComplete='off'
                                aria-autocomplete='none'
                                sx={{fontSize: '16px'}}
                            />
                        )}
                        options={typesDocument}
                        value={typeDocument}
                        onChange={(event: never, newValue: string | null) => {
                            console.log(event);
                            setTypeDocument(newValue);
                        }}
                    />
                    <TextField label={'Название документа'} value={fileName} onChange={(event) => setFileName(event.target.value)}/>
                </Box>
                <IconButton color={'primary'} onClick={(e) => createFileHandler(e)}>
                    <CheckCircleOutlineIcon/>
                </IconButton>
            </Box>
        </Modal>
    )
}