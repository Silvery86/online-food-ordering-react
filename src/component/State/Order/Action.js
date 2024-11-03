import { api } from "../../config/api"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            // Call the VNPay payment API
            const { data } = await api.post(`/api/order`, reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });

            // Check if there's a VNPay payment URL and redirect to it
            if (data.payment_url) {
                window.location.href = data.payment_url;
            }

            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
            console.log("Order created:", data);
        } catch (error) {
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
            console.log("Error:", error);

            // Redirect to failure page
            window.location.href = "/payment/fail";
        }
    };
};

export const getUserOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST });
        try {
            const { data } = await api.get(`/api/order/user`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data })
            console.log("User order :", data);
        } catch (error) {
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error })
            console.log("Error:", error);
        }
    }
}