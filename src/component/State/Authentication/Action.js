import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { api } from "../../config/api"

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await api.post(`/api/auth/signup`, reqData.userData)
        // if (data.jwt) localStorage.setItem("jwt", data.jwt);
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })
        setTimeout(() => {
            reqData.navigate("/");
           window.location.reload();
        }, 2000);
    } catch (error) {
        let message;
        switch (error.response?.status) {
            case 400:
                message = "Bad Request - Please check your input."
                break;
            case 401:
                message = "Unauthorized - Invalid credentials."
                break;
            case 403:
                message = "Đăng ký không thành công! Hãy kiểm tra lại thông tin."
                break;
            case 404:
                message = "Not Found - The requested resource was not found."
                break;
            case 500:
                message = null
                break;
            default:
                message = "Đăng ký không thành công! Hãy kiểm tra lại thông tin."
        }
        dispatch({ type: REGISTER_FAILURE, payload: message });
    }
}

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await api.post(`/api/auth/signin`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })
        setTimeout(() => {
            if (data.role === "ROLE_RESTAURANT_OWNER") {
                reqData.navigate("/admin/restaurant")
            }
            else {
                reqData.navigate("/")
            }
            window.location.reload()
        }, 2000);
    } catch (error) {
        let message;
        switch (error.response?.status) {
            case 400:
                message = "Bad Request - Please check your input."
                break;
            case 401:
                message = "Unauthorized - Invalid credentials."
                break;
            case 403:
                message = "Vui lòng kiểm tra lại thông tin đăng nhập"
                break;
            case 404:
                message = "Not Found - The requested resource was not found."
                break;
            case 500:
                message = null
                break;
            default:
                message = "Vui lòng kiểm tra lại thông tin đăng nhập"
        }
        dispatch({ type: LOGIN_FAILURE, payload: message });
    }
}

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: GET_USER_SUCCESS, payload: data })
        console.log("User profile", data)
    } catch (error) {
        let message;
        switch (error.response?.status) {
            case 400:
                message = "Bad Request - Please check your input."
                break;
            case 401:
                message = "Unauthorized - Invalid credentials."
                break;
            case 403:
                message = "Vui lòng kiểm tra lại thông tin đăng nhập"
                break;
            case 404:
                message = "Not Found - The requested resource was not found."
                break;
            case 500:
                message = null
                break;
            default:
                message = null
        }

        dispatch({ type: GET_USER_FAILURE, payload: message })

    }
}

export const addToFavorite = ({ jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST })
    try {
        const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favorites`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data })
        console.log("Add to favorites", data)
    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error })
        console.log("Error:", error)
    }
}

export const logout = () => async (dispatch) => {

    try {
        localStorage.clear()
        dispatch({ type: LOGOUT })

    } catch (error) {
        console.log("Error:", error)
    }
}
