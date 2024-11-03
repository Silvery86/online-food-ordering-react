import { api } from "../../config/api"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            // Create Pending Payment Order
            const order = await api.post(`/api/order`, reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: order.data });

            const orderId = order.data.id
            const totalPrice = order.data.totalPrice
            console.log("Order created:", order.data);

            // Get Order Id of Create Order
            const vnPayReqData = {
                amount: totalPrice,
                orderInfo: orderId,
            }
            // Call the VNPay payment API
            const res = await api.post(`/api/public/vn_pay/add_order?amount=${vnPayReqData.amount}&orderInfo=${vnPayReqData.orderInfo}`);
            console.log("Order res....", res.data.data)
            if (res.data.status == "Ok") {
               
                window.location.href = res.data.data;
            } else {
                return
            }

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

export const updateOrderStatus = (orderId, orderStatus, jwt) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
        try {
            const res = await api.put(`/api/order/${orderId}/status`, orderStatus, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: res.data });
            console.log("Order status updated:", res.data);
        } catch (error) {
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
            console.log("Error updating order status:", error);
        }
    };
};