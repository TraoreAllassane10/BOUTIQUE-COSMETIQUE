import { useGetCategoriesQuery } from "@/store/api/categorieApi";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

interface Categorie {
  id: string;
  nom: string;
}

const NavBar = () => {
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
  // Chargement des categories depuis L'API
  const { data: categoryData } = useGetCategoriesQuery(undefined);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopCosm</h1>
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
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              <Heart className="w-5 h-5" />
            </button>
            <button className="relative text-gray-700 hover:text-gray-900">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
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
