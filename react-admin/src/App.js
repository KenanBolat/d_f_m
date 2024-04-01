import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();


  return ( <ColorModeContext.Provider value = { colorMode } >

    <ThemeProvider theme = { theme } > </ThemeProvider> <CssBaseline />
    <div className = "app" >
      <main className="content"> </main>
      <h1>asdasd</h1>
   </div>
  </ColorModeContext.Provider>

  );
}

export default App;
