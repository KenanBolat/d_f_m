import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthService from "./services/auth.service";
import Register from "./Components/LoginForm/register";
import Header from "./Components/LoginForm/header";
import Login from "./Components/LoginForm/Login";
import Logout from "./Components/LoginForm/logout";
import Dashboard from "./Components/Dashboard/dashboard";
import Settings from './Components/Settings/settings';
import { AuthProvider } from './Contexts/AuthProvider';
import  ProtectedRoute from './Components/ProtectedRoute';




function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register></Register>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard"  element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
        <Route path="/settings"  element={<ProtectedRoute> <Settings /> </ProtectedRoute> } />
        <Route path="/" element={<Login />} /> {/* Updated this line */}
      </Routes>
    </Router>
    </AuthProvider> 
  );
}

export default App;
