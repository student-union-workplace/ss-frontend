import {Box, IconButton, Typography} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

type OtherDocumentProps = {
    doc: {
        type: string,
        title: string,
        link: string
    }

}

export const OtherDocument = ({doc}: OtherDocumentProps) => {
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
                <img src={doc.type === 'ppt' ? '/imgs/docs/ppt.svg' : '/imgs/docs/xlsx.svg'} alt={'icon'}/>
                <Typography sx={{
                    textDecoration: 'underline',
                    fontWeight: '600',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                }}>{doc.title}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <IconButton color={'primary'}>
                    <FileDownloadIcon/>
                </IconButton>
                <IconButton color={'primary'}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}