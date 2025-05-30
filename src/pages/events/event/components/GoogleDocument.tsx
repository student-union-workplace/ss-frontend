import {Box, IconButton, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {File} from "../../../../types/events";
import {useMutation, useQueryClient} from "react-query";
import {FilesApi} from "../../../../api/files";

type GoogleDocumentProps = {
    doc: File
}

export const GoogleDocument = ({doc}: GoogleDocumentProps) => {
    const queryClient = useQueryClient();

    const deleteDocumentMutation = useMutation(FilesApi.deleteDocument, {
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
                <Typography sx={{textDecoration: 'underline', fontWeight: '600', textOverflow: 'ellipsis',
                    overflow: 'hidden', cursor: 'pointer'}} onClick={() => window.open(doc.url, '_blank')}>{doc.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <IconButton color={'primary'}>
                    <EditIcon/>
                </IconButton>
                <IconButton color={'primary'} onClick={(e) => deleteFileHandler(e)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}