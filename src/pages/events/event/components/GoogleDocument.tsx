import {Box, IconButton, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type GoogleDocumentProps = {
    doc: {
        type: string,
        title: string,
        link: string
    }

}

export const GoogleDocument = ({doc}: GoogleDocumentProps) => {
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
                    overflow: 'hidden',}}>{doc.title}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <IconButton color={'primary'}>
                    <EditIcon/>
                </IconButton>
                <IconButton color={'primary'}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}