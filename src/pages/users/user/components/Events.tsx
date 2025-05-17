import {useQuery} from "react-query";
import {EventsApi} from "../../../../api/events";
import Tab from '@mui/material/Tab';
import Tabs from "@mui/material/Tabs";
import {SyntheticEvent, useState} from "react";
import {
    Box,
    Table,
    TableBody,
    TableContainer,
    Typography
} from "@mui/material";
import {EventData} from "../../../../types/events";
import {RowEvent} from "./RowEvent.tsx";
import {DecodedJwt} from "../../../../utils/jwt/DecodedJwt.tsx";
import {useParams} from "react-router-dom";

export const Events = () => {
    const [value, setValue] = useState<string>('current');
    const idJwt = DecodedJwt()!.id;
    const params = useParams();
    const idParams = params.id!;

    const handleChange = (_: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        console.log(newValue);
    };

    const {data: events} = useQuery(
        ['events', value],
        () => EventsApi.get({page: 1, take: 50, filters: {isArchived: value === 'archived',user_id: idParams }}),
        {refetchOnWindowFocus: false}
    );

    return(<Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%'}}>

            <Box sx={{width:'100%'}}>
                <Typography sx={{textAlign: 'center', paddingBottom: '2rem'}} variant={'h5'}>{idJwt === idParams ?'Мои мероприятия' : 'Мероприятия'}</Typography>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Текущие мероприятия" value='current'/>
                    <Tab label="Прошедшие мероприятия" value='archived'/>
                </Tabs>
                <TableContainer sx={{maxHeight: '80%', marginTop: '1rem',
                    overflowY: 'auto',}}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableBody>
                            {events?.data?.data
                                .map((row: EventData) => {
                                    return <RowEvent row={row} key={row.name} />
                                })}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>

    </Box>
    )
}