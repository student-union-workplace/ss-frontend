import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import {useQuery} from "react-query";
import {EventsApi} from "../../../api/events";
import { useMemo} from "react";
import {EventData} from "../../../types/events";
import {ActivitiesApi} from "../../../api/activities";
import './style.css'
import {RoutesName} from "../../../enums/routes";
import {DecodedJwt} from "../../../utils/jwt/DecodedJwt.tsx";
import {Role} from "../../../enums/roles";
type CalendarProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    idActivity?: string | null;
    setIdActivity: (idActivity: string | null) => void;
}

export const Calendar = ({ setOpen, setIdActivity}: CalendarProps) => {
    const role = DecodedJwt()?.role;
    const { data: events, isLoading: isLoadingEvents } = useQuery(
        ['events'],
        () => EventsApi.get({page: 1, take: 10000}),
        { refetchOnWindowFocus: false }
    );

    const { data: activities, isLoading: isLoadingActivities } = useQuery(
        ['activities'],
        () => ActivitiesApi.get({year: '2025'}),
        { refetchOnWindowFocus: false }
    );
    
     const INITIAL_EVENTS = useMemo(() => {
         if (events?.data?.data && activities?.data) {
             const eventsData = events?.data?.data?.map((event: EventData) => (
                 {id: event.id, title: event.name, start: new Date(event.date), backgroundColor: '#1DB8CA', borderColor: '#1DB8CA', display: 'block', type: 'event'}
             ))

             const activitiesData = activities?.data?.map((event: EventData) => (
                 {id: event.id, title: event.name, start: new Date(event.date), backgroundColor: '#1DB8CA', type: 'activity'}
             ))

             return [...eventsData, ...activitiesData]
         }
     }, [activities?.data, events?.data?.data])

    const isLoading = isLoadingEvents || isLoadingActivities

    return (!isLoading && <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, multiMonthPlugin ]}
        initialView="dayGridMonth"
        height={'35rem'}
        locale={'ru'}
        now={new Date()}
        nowIndicator={true}
        initialDate={new Date()}
        timeZone={'local'}
        firstDay={1}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        initialEvents={INITIAL_EVENTS}
        eventClick={(info) => {
            if (info.event.extendedProps.type === 'activity') {
                if (role !== Role.Old ) {
                    setOpen(true);
                    setIdActivity(info.event.id)
                }

            } else {
                window.open(`${RoutesName.Event}${info.event.id}`, '_blank')
            }
        }}
        buttonText={{
            today:    'Сегодня',
            month:    'Месяц',
            week:     'Неделя',
            day:      'День',
            year:       'Год',
            list:     'Лист',
            'all-day': ''
        }}
        customButtons={{
            addActivity: {
                text: 'Добавить событие',
                click: () => setOpen(true),
            }
        }}
        headerToolbar={{
            left: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            right: 'prev,next addActivity'
        }}
    />)
}