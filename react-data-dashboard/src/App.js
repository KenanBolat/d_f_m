import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthService from "./services/auth.service";
import Register from "./Components/LoginForm/register";
import Header from "./Components/LoginForm/header";
import Login from "./Components/LoginForm/Login";
import Logout from "./Components/LoginForm/logout";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register></Register>} />
        <Route path="/login" element={<div> asdasd sd asd</div>} />
        <Route path="/logout" element={<Logout></Logout>} />
        <Route path="/" element={<App></App>} />
      </Routes>
    </Router>
  );
}

export default App;
