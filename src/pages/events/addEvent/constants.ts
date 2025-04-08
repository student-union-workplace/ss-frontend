import { EventFormValues} from "../../../types/events";

export const ADD_EVENT_INITIAL_VALUE: EventFormValues = {
    past_event_id: '',
    name: '',
    theme_id: '',
    description: '',
    date: null,
    locations: [],
    managers: [],
    users: [],
    is_archived: false
}