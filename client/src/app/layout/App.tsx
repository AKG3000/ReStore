import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {
  const [darkMode,setDarkMode]=useState(false);
  const paletteMode = darkMode?'dark':'light';
  const theme = createTheme({
    palette:{
      mode:paletteMode,
      background: {
        default:paletteMode === 'light'?'#eaeaea':'#121212',
      }
    }
  });
  function toggleTheme(){
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
     <CssBaseline />
       <Header toggleTheme={toggleTheme} darkMode={darkMode}/>
       <Container>
         <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
