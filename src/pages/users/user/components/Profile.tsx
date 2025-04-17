import {Avatar, Box, CircularProgress, Divider, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useQuery} from "react-query";
import {UsersApi} from "../../../../api/users";
import {DecodedJwt} from "../../../../utils/jwt/DecodedJwt.tsx";

export const Profile = () => {
    const id = DecodedJwt()?.id;

    const { data: userData, isLoading } = useQuery(
        'user',
        () => UsersApi.getUser({id: id}),
        { refetchOnWindowFocus: false }
    );

    return (
        <Box>
            <Typography>Мой профиль</Typography>
            {isLoading ? <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CircularProgress/>
            </Box> : <Box>
                <Box>
                    <Avatar sx={{bgcolor: '#1DB8CA', width: '70px', height: '70px', cursor: 'pointer'}}>РГ</Avatar>
                    <Button variant={'contained'} color={'primary'} size={'small'}>Загрузить фото</Button>
                </Box>
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                            <Typography color={'textSecondary'}>ФИО </Typography>
                            <Typography>{userData?.data?.name ?? '-'}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="fullWidth" flexItem
                                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                            <Typography color={'textSecondary'}>Тел </Typography>
                            <Typography>{userData?.data?.phone_number ?? '-'}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="fullWidth" flexItem
                                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                            <Typography color={'textSecondary'}>ВК </Typography>
                            <Typography>{userData?.data?.vk_link ?? '-'}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="fullWidth" flexItem
                                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                            <Typography color={'textSecondary'}>ТГ </Typography>
                            <Typography>{userData?.data?.tg_link ?? '-'}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="fullWidth" flexItem
                                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                            <Typography color={'textSecondary'}>Комиссия </Typography>
                            <Typography>{userData?.data?.department?.name ?? '-'}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="fullWidth" flexItem
                                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                            <Typography color={'textSecondary'}>Должность </Typography>
                            <Typography>{userData?.data?.role ?? '-'}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="fullWidth" flexItem
                                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                            <Typography color={'textSecondary'}>Погоняло </Typography>
                            <Typography>{userData?.data?.name ?? '-'}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="fullWidth" flexItem
                                 sx={{borderWidth: '1px', borderColor: '#1FD4E9', marginBlock: '0.5rem'}}/>
                    </Box>
                </Box>
            </Box>}
        </Box>
    );
}