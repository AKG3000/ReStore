import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {

  const {setBasket} = useStoreContext();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie("buyerId");
    if(buyerId){
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(()=>setLoading(false));
    } else {
      setLoading(false);
    }
  },[setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteMode = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: paletteMode === 'light' ? '#eaeaea' : '#121212',
      }
    }
  });
  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initializing app..."></LoadingComponent>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar/>
      <CssBaseline />
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <Container>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/contact' component={ContactPage}/>
        <Route exact path='/catalog' component={Catalog}/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/catalog/:id' component={ProductDetails}/>
        <Route path='/server-error' component={ServerError}/>
        <Route path='/basket' component={BasketPage}/>
        <Route component={NotFound}/>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;