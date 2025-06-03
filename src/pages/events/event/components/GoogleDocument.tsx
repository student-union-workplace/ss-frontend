import {Box, IconButton, TextField, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {File} from "../../../../types/events";
import {useMutation, useQueryClient} from "react-query";
import {FilesApi} from "../../../../api/files";
import {useState} from "react";
import { SaveOutlined} from "@mui/icons-material";

type GoogleDocumentProps = {
    doc: File
}

export const GoogleDocument = ({doc}: GoogleDocumentProps) => {
    const queryClient = useQueryClient();
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(doc.name)

    const deleteDocumentMutation = useMutation(FilesApi.deleteDocument, {
        onSuccess: () => {
            queryClient.invalidateQueries('event');
        }
    });

    const updateDocumentMutation = useMutation(FilesApi.updateGoogleDoc, {
        onSuccess: () => {
            queryClient.invalidateQueries('event');
        }
    });

    const updateSheetMutation = useMutation(FilesApi.updateGoogleSheet, {
        onSuccess: () => {
            queryClient.invalidateQueries('event');
        }
    });

    const deleteFileHandler = async (e) => {
        e.preventDefault();
        try {
            await deleteDocumentMutation.mutateAsync({
                fileId: doc.id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            if (doc?.type === 'doc') {
                await updateDocumentMutation.mutateAsync({
                    name: title,
                    id: doc.id
                });
            }

            if (doc?.type === 'sheet') {
                await updateSheetMutation.mutateAsync({
                    name: title,
                    id: doc.id
                });
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsEdit(false);
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            }}>
                <img src={doc.type === 'doc' ? '/imgs/docs/doc.svg' : '/imgs/docs/xls.svg'} alt={'icon'}/>
                {isEdit ? <TextField
                    label={'Название'}
                    value={title}
                    size={'small'}
                    onChange={(e) => setTitle(e.target.value)}
                /> : <Typography
                    sx={{
                        textDecoration: 'underline',
                        fontWeight: '600',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }}
                    onClick={() => window.open(doc.url, '_blank')}
                >{doc.name}</Typography>}
            </Box>
            {isEdit ? <IconButton color={'primary'} onClick={(e) => updateHandler(e)}>
                <SaveOutlined/>
            </IconButton> : <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <IconButton color={'primary'} onClick={() => setIsEdit(true)}>
                    <EditIcon/>
                </IconButton>
                <IconButton color={'primary'} onClick={(e) => deleteFileHandler(e)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>}
        </Box>
    )
}