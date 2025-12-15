import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  Star,
  ChevronRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetCategoriesQuery } from "@/store/api/categorieApi";
import { useGetProduitsQuery } from "@/store/api/produitApi";

interface Categorie {
  id: number;
  nom: string;
}

interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  image: string;
  category: {
    id: number;
    nom: string;
  };
}

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const { data: categoryData } = useGetCategoriesQuery(undefined);
  const { data: productData } = useGetProduitsQuery({
    search: "",
    categorie: "",
  });

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Bannière Hero */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Boutique Cosmétique
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Jusqu'à -50% sur une sélection de produits. Offre limitée !
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 cursor-pointer"
            >
              Découvrir nos produits
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Bannière Avantages */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-purple-600 mb-2">🚚</div>
              <h3 className="font-semibold">Livraison Gratuite</h3>
              <p className="text-sm text-gray-600">Dès 50€ d'achat</p>
            </div>
            <div>
              <div className="text-purple-600 mb-2">↩️</div>
              <h3 className="font-semibold">Retours Faciles</h3>
              <p className="text-sm text-gray-600">
                30 jours pour changer d'avis
              </p>
            </div>
            <div>
              <div className="text-purple-600 mb-2">🔒</div>
              <h3 className="font-semibold">Paiement Sécurisé</h3>
              <p className="text-sm text-gray-600">100% sécurisé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Produits Populaires
          </h2>
          <a
            href="#"
            className="text-purple-600 hover:text-purple-700 flex items-center"
          >
            Voir tout
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData?.data.map((product: Produit) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    alt={product.nom}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-red-500">
                      {product.badge}
                    </Badge>
                  )} */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.nom}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(4.5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {/* <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span> */}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {product.prix} fcfa
                      </span>
                      {/* {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.originalPrice}€
                        </span>
                      )} */}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={addToCart}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Ajouter au panier
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopStyle</h3>
              <p className="text-gray-400">
                Votre destination pour les produits tendances et de qualité.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Catégories</h4>
              <ul className="space-y-2 text-gray-400">
                {categoryData?.data.map((category: Categorie) => (
                  <li key={category.id}>
                    <a href="#" className="hover:text-white">
                      {category.nom}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Aide</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Livraison
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Retours
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Recevez nos offres exclusives
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  OK
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopStyle. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
