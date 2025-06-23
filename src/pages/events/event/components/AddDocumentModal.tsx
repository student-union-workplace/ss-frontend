import {Box, IconButton, Modal, TextField, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Autocomplete from "@mui/material/Autocomplete";
import {useMutation, useQueryClient} from "react-query";
import {FilesApi} from "../../../../api/files";
import Button from "@mui/material/Button";

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
    const [uploadFile, setUploadFile] = useState<File>();
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

    const createInfoOtherFileMutation = useMutation(FilesApi.addInfoOtherFile, {
        onSuccess: () => {
            queryClient.invalidateQueries('file');
        }
    });

    const createFileHandler = async () => {
        /*e.preventDefault();*/

            if (typeDocument?.value === 'doc') {
                try {
                    await createGoogleDocMutation.mutateAsync({
                        title: fileName,
                        eventId: idEvent,
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                     window.location.reload();
                }
            }

        if (typeDocument?.value === 'sheet') {
            try {
                await createGoogleSheetMutation.mutateAsync({
                    title: fileName,
                    eventId: idEvent,
                });
            } catch (error) {
                console.log(error);
            } finally {
                window.location.reload();
            }
        }


            if (typeDocument?.value === 'other') {
                await createInfoOtherFileMutation.mutateAsync({
                    eventId: idEvent,
                    file: uploadFile
                }, {
                    onSuccess: async response => {
                        try {
                            await fetch(response.data.uploadUrl, {
                            method: 'PUT',
                            body: uploadFile,
                        });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
            }
            setOpen(false);
    }

    const handleChangeBill = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files) {
            setUploadFile(event?.target?.files[0]);
        }
    };

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
                                size={'small'}
                            />
                        )}
                        options={typesDocument}
                        value={typeDocument}
                        onChange={(event: never, newValue: string | null) => {
                            setTypeDocument(newValue);
                        }}
                    />

                    {typeDocument?.value === 'other' ? <>
                        <input
                            onChange={event => handleChangeBill(event)}
                            type='file'
                            id='uploadFile'
                            style={{display: 'none', width: 0}}
                            accept='.pdf, .xlsx'
                        />
                        <label htmlFor={'uploadFile'}>
                            <Button
                                startIcon={<i className='ri-file-add-line text=[28px]'></i>}
                                component={'span'}
                                variant={'outlined'}
                                size={'small'}
                            >
                                Загрузить файл
                            </Button>
                        </label>
                    </> : <TextField label={'Название документа'} value={fileName} size={'small'}
                                     onChange={(event) => setFileName(event.target.value)}/>}

                    <Typography>{uploadFile?.name}</Typography>
                </Box>
                <IconButton color={'primary'} onClick={(e) => createFileHandler(e)}>
                    <CheckCircleOutlineIcon/>
                </IconButton>
            </Box>
        </Modal>
    )
}