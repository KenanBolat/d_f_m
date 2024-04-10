import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Route, Routes } from "react-router-dom";

import TopBar from "./scenes/global/TopBar";
import DashBoard from "./scenes/Dashboard";
import SideBar from "./scenes/global/SideBar";
// import Team from "./scenes/Team";
// import Invoice from "./scenes/Invoice";
// import Contacts from "./scenes/Contacts";
// import Bar from "./scenes/Bar";
// import From from "./scenes/From";
// import Line from "./scenes/Line";
// import Pie from "./scenes/Pie";
// import FAQ from "./scenes/FAQ";
// import Geography from "./scenes/Geography";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {" "}
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<DashBoard />}></Route>
              {/* <Route path="/Team" element={<Team />}> </Route>
              <Route path="/Invoice" element={<Invoice />}></Route>
              <Route path="/Contacts" element={<Contacts />}></Route>
              <Route path="/Bar" element={<Bar />}></Route>
              <Route path="/From" element={<From />}></Route>
              <Route path="/Line" element={<Line />}></Route>
              <Route path="/Pie" element={<Pie />}></Route>
              <Route path="/FAQ" element={<FAQ />}></Route>
              <Route path="/Geography" element={<Geography />}></Route> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
