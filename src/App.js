import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import { Routers } from './component/Routers/Routers';
import { getRestaurantByUserId } from './component/State/Restaurant/Action';

function App() {
  const dispatch = useDispatch();
  const storedJwt = localStorage.getItem("jwt");
  const auth = useSelector(store => store.auth);
  const cart = useSelector(store => store.cart);
  
  useEffect(() => {
    // If JWT is in local storage and not already in auth, dispatch getUser
    if (storedJwt && !auth.jwt) {
      dispatch(getUser(storedJwt));
      dispatch(findCart(storedJwt));
    }
  }, [storedJwt, auth.jwt, dispatch]);

  useEffect(() => {
    // Check if auth is loaded and user role is 'ROLE_RESTAURANT_OWNER'
    if (auth.user && auth.user.role === "ROLE_RESTAURANT_OWNER") {
      dispatch(getRestaurantByUserId(storedJwt));
    }
  }, [auth.user, storedJwt, dispatch]);
  
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>

  );
}

export default App;
