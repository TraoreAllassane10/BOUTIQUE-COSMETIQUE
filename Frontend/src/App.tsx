import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client";
import Commande from "./pages/Commande";
import Parametre from "./pages/Parametre";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/client" element={<Client/>} />
        <Route path="/commande" element={<Commande/>} />
        <Route path="/paramettre" element={<Parametre/>} />
      </Routes>
    </Router>
  );
}

export default App;
