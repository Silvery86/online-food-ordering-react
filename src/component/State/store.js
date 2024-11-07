import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import restaurantsOrderReducer from "./RestaurantOrder/Reducer";
import ingredientReducer from "./Ingredients/Reducer";
import authReducer from "./Authentication/Reducer";
import eventReducer from "./Event/Reducer";
import tableOrderReducer from "./OrderTable/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order: orderReducer,
    restaurantOrder : restaurantsOrderReducer,
    ingredients:ingredientReducer,
    event:eventReducer,
    tableOrder:tableOrderReducer
})

export const store =  legacy_createStore(rootReducer,applyMiddleware(thunk));
