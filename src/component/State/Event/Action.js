import { api } from "../../config/api"
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
    GET_EVENT_BY_ID_SUCCESS,
    GET_EVENT_BY_ID_REQUEST,
    GET_EVENT_BY_ID_FAILURE,
} from './ActionType.js';

// Fetch all events
export const getAllEvents = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENT_REQUEST });
        try {
            const response = await api.get('/api/public/event'); // Adjust the endpoint as needed
          
            dispatch({ type: GET_ALL_EVENT_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_ALL_EVENT_FAILURE, error: error.message });
        }
    };
};

// Fetch all events by restaurant ID
export const getAllRestaurantEvents = (restaurantId) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANT_EVENT_REQUEST });
        try {
            const response = await api.get(`/api/events/restaurant/${restaurantId}`);
            const data = await response.json();
            dispatch({ type: GET_ALL_RESTAURANT_EVENT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_ALL_RESTAURANT_EVENT_FAILURE, error: error.message });
        }
    };
};

// Fetch a single event by ID
export const getEventById = (eventId) => {
    return async (dispatch) => {
        dispatch({ type: GET_EVENT_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/public/event/${eventId}`);
            dispatch({ type: GET_EVENT_BY_ID_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_EVENT_BY_ID_FAILURE, error: error.message });
        }
    };
};

// Create an event
export const createEvent = ({eventData,jwt,navigate}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EVENT_REQUEST });
        try {
            const response = await api.post('/api/events', 
                eventData,
                {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });         
            dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data });
            setTimeout(() => {
                navigate("/admin/restaurant/event");
            }, 2000);
        } catch (error) {
            dispatch({ type: CREATE_EVENT_FAILURE, error: error.message });
            
            
        }
    };
};

// Update an event
export const updateEvent = ({ id, eventData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_EVENT_REQUEST });
        try {
            const response = await api.put(
                `/api/admin/events/${id}`,
                eventData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: UPDATE_EVENT_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: UPDATE_EVENT_FAILURE, error: error.message });
            console.log("Error:", error);
        }
    };
};

// Delete an event
export const deleteEvent = ({ id, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVENT_REQUEST });
        try {
            await api.delete(`/api/admin/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: DELETE_EVENT_SUCCESS, payload: id });
        } catch (error) {
            dispatch({ type: DELETE_EVENT_FAILURE, error: error.message });
            console.log("Error:", error);
        }
    };
};

