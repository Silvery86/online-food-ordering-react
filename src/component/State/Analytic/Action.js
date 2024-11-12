import { FETCH_ANALYTICS_REQUEST, FETCH_ANALYTICS_SUCCESS, FETCH_ANALYTICS_FAILURE } from './ActionType';
import { api } from "../../config/api";

// Thunk function to fetch analytics data
export const fetchAnalyticsData = (restaurantId, jwt) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ANALYTICS_REQUEST });
    try {
      // Making the API request with JWT authorization
      const {data} = await api.get(`/api/analytics?restaurantId=${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Dispatch success action with the response data (monthlyData)
      dispatch({ type: FETCH_ANALYTICS_SUCCESS, payload: data.monthlyData });
      console.log("Analytics Data:", data.monthlyData); // Log the fetched data
    } catch (error) {
      // Dispatch failure action if there was an error
    
      dispatch({ type: FETCH_ANALYTICS_FAILURE, payload: error });
      console.error("Error fetching analytics data:", error); // Log the error
    }
  };
};
