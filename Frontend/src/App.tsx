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
import ShowProduit from "./pages/produit/ShowProduit";
import AdminRoutes from "./components/AdminRoutes";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Panier from "./pages/Panier";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Client */}
        <Route
          path="/produits"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route path="/panier" element={<Panier />} />

        {/* Admin */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminRoutes>
                <Dashboard />
              </AdminRoutes>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorie"
          element={
            <ProtectedRoute>
              <Categorie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorie/:id"
          element={
            <ProtectedRoute>
              <EditCategorie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produit"
          element={
            <ProtectedRoute>
              <Produit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produit/:id"
          element={
            <ProtectedRoute>
              <EditProduit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produit/:id/show"
          element={
            <ProtectedRoute>
              <ShowProduit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute>
              <Client />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commande"
          element={
            <ProtectedRoute>
              <Commande />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paramettre"
          element={
            <ProtectedRoute>
              <Parametre />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
