import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import { Routers } from './component/Routers/Routers';
import { getRestaurantByUserId } from './component/State/Restaurant/Action';
import { lightTheme } from './Theme/LightTheme';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector(store => store.auth);
  const restaurant = useSelector(store => store.restaurant);
  const cart = useSelector(store => store.cart);

  useEffect(() => {
    // If JWT is in local storage and not already in auth, dispatch getUser
    if (jwt && !auth.jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);

  useEffect(() => {
    // Dispatch findCart whenever the cart state updates
    if (jwt) {
      dispatch(findCart(jwt));
    }
  }, [cart.cartItems.id, jwt, auth.jwt, dispatch]);


  useEffect(() => {
    const isRestaurantOwner = auth.user && auth.user.role === "ROLE_RESTAURANT_OWNER";
    const hasRestaurant = restaurant.usersRestaurant !== null;

    // Check if conditions are met before dispatching
    if (isRestaurantOwner && hasRestaurant) {
      dispatch(getRestaurantByUserId(jwt));
    }
  }, [auth.user?.role, restaurant.usersRestaurant?.id, jwt, dispatch]);




  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Routers />
      
    </ThemeProvider>

  );
}

export default App;
