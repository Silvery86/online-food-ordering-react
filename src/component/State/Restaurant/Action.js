import { api } from "../../config/api"
import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_EVENTS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    DELETE_EVENTS_FAILURE,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS, GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    GET_RESTAURANT_CATEGORY_FAILURE,
    GET_RESTAURANT_CATEGORY_REQUEST,
    GET_RESTAURANT_CATEGORY_SUCCESS,
    GET_RESTAURANT_EVENTS_FAILURE,
    GET_RESTAURANT_EVENTS_REQUEST,
    GET_RESTAURANT_EVENTS_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_SUCCESS
} from "./ActionType"

export const getAllRestaurantsAction = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const { data } = await api.get("/api/restaurants", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data })
            console.log("All restaurants:", data);
        } catch (error) {
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/restaurants/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data })
            console.log("Restaurant by id:", response.data);
        } catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/restaurants/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data })
            console.log("Restaurant by user id:", data);
        } catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const createRestaurant = (reqData) => {
    console.log("token :", reqData.token);
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data })
            console.log("Restaurant created:", data);
        } catch (error) {
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}


export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const res = await api.put(`/api/admin/restaurants/${restaurantId}`,
                restaurantData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data })
            console.log("Restaurant update:", res.data);
        } catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const deleteRestaurant = ({ restaurantId, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const res = await api.delete(`/api/admin/restaurants/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId })
            console.log("Restaurant deleted!", restaurantId);
        } catch (error) {
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {
            const res = await api.put(
                `/api/admin/restaurants/${restaurantId}/status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data })
            console.log("Restaurant status updated!", res.data);
        } catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const createEventAction = ({ data, jwt, restaurantId }) => {

    return async (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST });
        try {
            const res = await api.post(
                `/api/admin/events/restaurants/${restaurantId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data })
            console.log("Event created: ", res.data);
        } catch (error) {
            dispatch({ type: CREATE_EVENTS_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const getAllEvents = ({ jwt }) => {

    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST });
        try {
            const res = await api.get(
                `/api/events`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data })
            console.log("Events : ", res.data);
        } catch (error) {
            dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const deleteEventAction = ({ eventId, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST });
        try {
            const res = await api.delete(
                `/api/admin/events/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId })
            console.log("Events deleted : ", eventId);
        } catch (error) {
            dispatch({ type: DELETE_EVENTS_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const getRestaurantEvents = ({ restaurantId, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST });
        try {
            const res = await api.get(
                `/api/admin/events/restaurant/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: GET_RESTAURANT_EVENTS_SUCCESS, payload: res.data })
            console.log("Events : ", res.data);
        } catch (error) {
            dispatch({ type: GET_RESTAURANT_EVENTS_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const createCategoryAction = ({ reqData, jwt }) => {

    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {
            const res = await api.post(
                `/api/admin/category`,
                reqData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data })
            console.log("Create category : ", res.data);
        } catch (error) {
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const getRestaurantCategory = ({ jwt, restaurantId }) => {

    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
        try {
            const res = await api.get(
                `/api/category/restaurant/${restaurantId}`,               
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data })
            console.log("Create category : ", res.data);
        } catch (error) {
            dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}