import { EventFormValues} from "../../../types/events";

export const ADD_EVENT_INITIAL_VALUE: EventFormValues = {
    past_event_id: null,
    name: null,
    theme_id: '',
    description: null,
    date: null,
    locations: [],
    managers: [],
    users: [],
    is_archived: false
}