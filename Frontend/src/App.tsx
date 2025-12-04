import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client";
import Commande from "./pages/Commande";
import Parametre from "./pages/Parametre";
import ProtectedRoute from "./components/ProtectedRoute";
import Categorie from "./pages/categorie/Categorie";
import Produit from "./pages/produit/Produit";
import EditCategorie from "./pages/categorie/EditCategorie";
import EditProduit from "./pages/produit/EditProduit";

function App() {
  return (
    <ProtectedRoute>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categorie" element={<Categorie />} />
          <Route path="/categorie/:id" element={<EditCategorie />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/produit/:id" element={<EditProduit />} />
          <Route path="/client" element={<Client />} />
          <Route path="/commande" element={<Commande />} />
          <Route path="/paramettre" element={<Parametre />} />
        </Routes>
      </Router>
    </ProtectedRoute>
  );
}

export default App;
