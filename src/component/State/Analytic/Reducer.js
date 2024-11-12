import * as actionTypes from "./ActionType";

const initialState = {
  loading: false,
  analyticData: {},  
  error: null,      
};

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ANALYTICS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ANALYTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        analyticData: action.payload,
      };
    case actionTypes.FETCH_ANALYTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default analyticsReducer;
