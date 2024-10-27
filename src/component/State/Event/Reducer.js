// reducers/eventReducer.js

import {
    GET_ALL_EVENT_REQUEST,
    GET_ALL_EVENT_SUCCESS,
    GET_ALL_EVENT_FAILURE,
    GET_ALL_RESTAURANT_EVENT_REQUEST,
    GET_ALL_RESTAURANT_EVENT_SUCCESS,
    GET_ALL_RESTAURANT_EVENT_FAILURE,
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAILURE,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAILURE,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILURE,
    GET_EVENT_BY_ID_REQUEST,
    GET_EVENT_BY_ID_SUCCESS,
    GET_EVENT_BY_ID_FAILURE,
} from './ActionType.js';

const initialState = {
    events: [],
    restaurantEvents: [],
    selectedEvent: null, // Add a field to store the selected event
    loading: false,
    error: null,
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENT_REQUEST:
        case GET_ALL_RESTAURANT_EVENT_REQUEST:
        case CREATE_EVENT_REQUEST:
        case UPDATE_EVENT_REQUEST:
        case DELETE_EVENT_REQUEST:
        case GET_EVENT_BY_ID_REQUEST: // Add this case
            return { ...state, loading: true, error: null };

        case GET_ALL_EVENT_SUCCESS:
            return { ...state, loading: false, events: action.payload };

        case GET_ALL_RESTAURANT_EVENT_SUCCESS:
            return { ...state, loading: false, restaurantEvents: action.payload };

        case CREATE_EVENT_SUCCESS:
            return { ...state, loading: false, events: [...state.events, action.payload] };

        case UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.map(event =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };

        case DELETE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter(event => event.id !== action.payload),
            };

        case GET_EVENT_BY_ID_SUCCESS: // Handle success for fetching a single event
            return { ...state, loading: false, selectedEvent: action.payload };

        case GET_ALL_EVENT_FAILURE:
        case GET_ALL_RESTAURANT_EVENT_FAILURE:
        case CREATE_EVENT_FAILURE:
        case UPDATE_EVENT_FAILURE:
        case DELETE_EVENT_FAILURE:
        case GET_EVENT_BY_ID_FAILURE: // Handle failure for fetching a single event
            return { ...state, loading: false, error: action.error };

        default:
            return state;
    }
};

export default eventReducer;
