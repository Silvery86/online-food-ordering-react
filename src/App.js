import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import { Routers } from './component/Routers/Routers';
import { getRestaurantByUserId } from './component/State/Restaurant/Action';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const auth = useSelector((store) => store.auth);
  const cart = useSelector((store) => store.cart);  
  useEffect(() => {
    if(auth.jwt){
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
      dispatch(getRestaurantByUserId(jwt));
    }
     
  }, [jwt || auth.jwt]);
  
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>

  );
}

export default App;
