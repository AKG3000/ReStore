import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/catalog/:id' element={<ProductDetails />} />
        </Routes>

      </Container>
    </ThemeProvider>
  );
}

export default App;
