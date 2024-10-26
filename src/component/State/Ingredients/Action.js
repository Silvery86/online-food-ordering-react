import { api } from "../../config/api"
import { CREATE_INFREDIENT_SUCCESS, CREATE_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from "./ActionType";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
    return async (dispatch) => {

        try {
            const response = await api.get(`/api/admin/ingredient/restaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_INGREDIENTS, payload: response.data })
        } catch (error) {

            console.log("Error:", error);
        }
    }
}

export const createIngredient = ({ data, jwt }) => {
    return async (dispatch) => {

        try {
            const response = await api.post(`/api/admin/ingredient`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: CREATE_INFREDIENT_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

export const createIngredientCategory = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(`/api/admin/ingredient/category`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

export const getIngredientCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredient/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

export const updateStockOfIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const {data} = await api.put(`/api/admin/ingredient/${id}/stoke`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: UPDATE_STOCK, payload: data })
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

