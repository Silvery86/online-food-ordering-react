import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import CustomerRoute from './component/Routers/CustomerRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import { Routers } from './component/Routers/Routers';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const auth = useSelector(store => store.auth);
  const cart = useSelector(store => store.cart);
  // console.log(jwt);
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  }, [auth.jwt, jwt])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>

  );
}

export default App;
