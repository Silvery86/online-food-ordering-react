import { api } from "../../config/api"
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";

export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post("/api/admin/food",
                menu,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data })
            console.log("Menu created :", data);
        } catch (error) {
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try {
            // Construct the query parameters based on the presence of values in reqData
            const queryParams = [];
            if (reqData?.vegetarian !== undefined) queryParams.push(`vegetarian=${reqData.vegetarian}`);
            if (reqData?.nonveg !== undefined) queryParams.push(`nonveg=${reqData.nonveg}`);
            if (reqData?.seasonal !== undefined) queryParams.push(`seasonal=${reqData.seasonal}`);
            if (reqData?.foodCategory !== undefined) queryParams.push(`food_category=${reqData.foodCategory}`);
            
            // Join the query parameters to form the final query string
            const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

            const { data } = await api.get(
                `/api/food/restaurant/${reqData.restaurantId}${queryString}`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`,
                    },
                }
            );

            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
            console.log("Menu items by restaurant:", data);
        } catch (error) {
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
            console.log("Error:", error);
        }
    };
};


export const searchMenuItem = ({ keyword, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.get(
                `/api/food/search?name=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data })
            console.log("Search menu :", data);
        } catch (error) {
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const updateMenuItemAvailability = ({ foodId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/food/${foodId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data })
            console.log("Updated menu :", data);
        } catch (error) {
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}

export const deleteFoodAction = ({ foodId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        try {
            await api.delete(
                `/api/admin/food/${foodId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            // Dispatch success with foodId as the payload
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
            console.log("Deleted food:", foodId);
        } catch (error) {
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
            console.log("Error:", error);
        }
    };
};
