import { api } from "../../config/api"
import { CREATE_INFREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from "./ActionType";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
    return async (dispatch) => {

        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_INGREDIENTS, payload: response.data })
            console.log("All restaurant ingredients:", data);
        } catch (error) {

            console.log("Error:", error);
        }
    }
}

export const createIngredient = ({ data, jwt }) => {
    return async (dispatch) => {

        try {
            const response = await api.post(`/api/admin/ingredients`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: CREATE_INFREDIENT_SUCCESS, payload: response.data })
            console.log("Ingredients create:", response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

export const createIngredientCategory = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(`/api/admin/ingredients/category`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: CREATE_INFREDIENT_SUCCESS, payload: response.data })
            console.log("Ingredients category create:", response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

export const getIngredientCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data })
            console.log("Ingredients category create:", response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

export const updateStockOfIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const {data} = await api.put(`/api/admin/ingredients/${id}/stock`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: UPDATE_STOCK, payload: data })
            console.log("Ingredients stock update:", data);
        } catch (error) {
            console.log("Error:", error);
        }
    }
}

