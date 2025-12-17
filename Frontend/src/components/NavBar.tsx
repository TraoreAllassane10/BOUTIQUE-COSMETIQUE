import { useGetCategoriesQuery } from "@/store/api/categorieApi";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../store/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";

interface Categorie {
  id: string;
  nom: string;
}

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user = useSelector(selectCurrentUser);
  const user = JSON.parse(localStorage.getItem("user"));

  //State global qui contient le nombre de produit dans le panier
  const cartCount = useSelector(selectCartCount);

  // Chargement des categories depuis L'API
  const { data: categoryData } = useGetCategoriesQuery(undefined);

  // Deconnexion d'un utilisateur
  const handleLogout = () => {
    dispatch(logout())

    navigate(0)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold text-gray-900">ShopCosm</h1>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            {categoryData?.data?.map((category: Categorie) => (
              <a
                key={category.id}
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {category.nom}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex text-gray-700 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </button>

            <button className="text-gray-700 hover:text-gray-900">
              <Heart className="w-5 h-5" />
            </button>

            <Link
              to="/panier"
              className="relative text-gray-700 hover:text-gray-900"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center place-items-center text-gray-700">
                  <User className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>

                <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800 transition cursor-pointer">
                  Déconnexion
                </button>
              </div>
            )}

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {categoryData?.data.map((category: Categorie) => (
              <a
                key={category.id}
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                {category.nom}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
