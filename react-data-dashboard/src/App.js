import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/LoginForm/register";
import Header from "./Components/LoginForm/header";
import Login from "./Components/LoginForm/Login";
import Logout from "./Components/LoginForm/logout";
import Dashboard from "./Components/Dashboard/dashboard";
import Settings from "./Components/Settings/settings";
import DataList from "./Components/Dashboard/datalist";
import Home from "./Components/Landing/home";
import { AuthProvider } from "./Contexts/AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import WebSocketComponent from "./Components/Landing/WebSocketComponent";


import Navbar from "./Components/Navbar/Navbar";


import DataTable from "./Components/Products/DataTable";
import ProductPage from "./Components/Products/ProductPage";
import ChannelAnimation from "./Components/Products/ChannelAnimation";
import MapComponent from "./Components/Products/map/MapComponent";


import ConfigurationPage from "./Components/Configuration/ConfigurationPage";

import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";

function App() {
  
  return (
    <AuthProvider>
      <Router>
       <Header />
        <Navbar />

        <Routes>
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ws" element={<WebSocketComponent />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/datalist" element={<DataList />} />
          <Route path="/datatable" element={<DataTable />} />
          <Route path="/channels" element={<ChannelAnimation />} />
          <Route path="/configuration" element={<ConfigurationPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                {" "}
                <Settings />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                {" "}
                <DataList />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} /> {/* Updated this line */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
