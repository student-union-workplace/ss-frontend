import {Box, Chip, CircularProgress, IconButton, Modal, Typography} from "@mui/material";
import { useState} from "react";
import {format} from "date-fns";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useQuery} from "react-query";
import {ActivitiesApi} from "../../../../api/activities";
import {AddActivityModal} from "../AddActivity/AddActivityModal.tsx";
import {DecodedJwt} from "../../../../utils/jwt/DecodedJwt.tsx";
import {Role} from "../../../../enums/roles";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    maxWidth: '600px',
    bgcolor: '#FFF',
    borderRadius: '20px',
    boxShadow: 24,
    p: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
};

type ActivityModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    id: string;
    setIdActivity: (id: string | null) => void;
}

export const ActivityModal = ({open, setOpen, id, setIdActivity}: ActivityModalProps) => {
    const [openAddActivityModal, setOpenAddActivityModal] = useState(false)
    const role = DecodedJwt()?.role;

    const handleClose = () => {
        setOpen(false)
        setIdActivity(null)
    }

    const handleEditClick = () => {
        setOpenAddActivityModal(true)
        /*setOpen(false)*/
    }

    const { data, isLoading } = useQuery(['activity', openAddActivityModal, id], () => ActivitiesApi.getActivity({id: id}), {
        refetchOnWindowFocus: false,
        enabled: !!id
    });

    return (
        <Modal open={open} onClose={handleClose} key={id} disableEnforceFocus>
            {isLoading ? <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CircularProgress/>
            </Box> : <Box sx={style}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        width: '100%',
                        paddingTop: '5px'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: '500',
                                margin: 0,
                                padding: 0
                            }}>{data?.data?.name}</Typography>
                        {role !== Role.Old && <IconButton onClick={handleEditClick}>
                            <EditOutlinedIcon/>
                        </IconButton>}
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Описание события</Typography>
                        <Box sx={{maxHeight: '100px', overflowY: 'auto'}}>
                            <Typography
                                color={'textPrimary'}>{data?.data?.description ?? '-'}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Участники</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.5rem'}}>
                            {data?.data?.users?.map(user => {
                                return <Chip variant={'outlined'} label={user?.name}
                                             sx={{
                                                 borderColor: `#1DB8CA`,
                                             }} size={'small'}/>
                            })}
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Дата</Typography>
                        <Typography
                            color={'textPrimary'}>{format(data?.data?.date ?? new Date(), "dd.MM.yyyy HH:mm")}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px'}}>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>Место проведения</Typography>
                        <Chip variant={'outlined'} label={data?.data?.location?.name}
                              sx={{
                                  borderColor: `#1DB8CA`,
                              }} size={'small'}/>
                    </Box>
                    <AddActivityModal open={openAddActivityModal} setOpen={setOpenAddActivityModal} idActivity={id} setIdActivity={setIdActivity}/>
                </Box>
            </Box>}
        </Modal>
    )
}