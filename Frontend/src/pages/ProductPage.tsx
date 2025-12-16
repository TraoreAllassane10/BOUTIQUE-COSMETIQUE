import { useState } from "react";
import { X, Heart, Star, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "@/store/api/categorieApi";
import { useGetProduitsQuery } from "@/store/api/produitApi";
import { addCart } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";

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

interface Category {
  id: number;
  nom: string;
}

export default function ProductPage() {
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  const { data: productData } = useGetProduitsQuery({
    search: "",
    categorie: "",
  });

  const { data: categoryData } = useGetCategoriesQuery(undefined);

  const filteredProducts = productData?.data.filter((product: Produit) => {
    const matchesPrice =
      product.prix >= priceRange[0] && product.prix <= priceRange[1];

    const matchesCategory =
      selectedCategories.size === 0 ||
      selectedCategories.has(product.category.id);

    return matchesPrice && matchesCategory;
  });

  const addToCart = (id: number, image: string, nom: string, prix: number) => {
    dispatch(addCart({ id, image, nom, prix }));
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

  const toggleCategory = (category: number) => {
    setSelectedCategories((prev) => {
      const newCategories = new Set(prev);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      return newCategories;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">Produits</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de la page */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Produits
          </h1>
          <p className="text-gray-600">Decouvrez tous nos produits</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barre latérale de filtres - Desktop */}
          <aside
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filtres</h2>
                <button
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Catégories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categoryData?.data.map((category: Category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={category.id.toString()}
                        checked={selectedCategories.has(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={category.id.toString()}
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        {category.nom}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Prix</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  step={10}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0]} fcfa</span>
                  <span>{priceRange[1]} fcfa</span>
                </div>
              </div>

              {/* Réinitialiser */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategories(new Set());
                  setPriceRange([0, 500]);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </aside>

          {/* Contenu principal */}
          <main className="flex-1">
            {/* Barre d'outils */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="lg:hidden flex items-center gap-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setShowFilters(true)}
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>Filtres</span>
                  </button>
                  <span className="text-gray-600">
                    {productData?.data.length} produits trouvés
                  </span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Vue */}
                  <div className="hidden sm:flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid"
                          ? "bg-purple-100 text-purple-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list"
                          ? "bg-purple-100 text-purple-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille de produits */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts?.map((product: Produit) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-lg transition-shadow duration-300 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardContent
                    className={`p-0 ${
                      viewMode === "list" ? "flex flex-row w-full" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "w-48" : ""
                      }`}
                    >
                      <img
                        src={`http://localhost:8000/storage/${product.image}`}
                        alt={product.nom}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "h-full" : "h-64"
                        }`}
                      />

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

                    <div
                      className={`p-4 ${
                        viewMode === "list"
                          ? "flex-1 flex flex-col justify-between"
                          : ""
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {product.nom}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.category.nom}
                        </p>
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
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              {product.prix}fcfa
                            </span>
                          </div>
                        </div>
                      </div>

                      {viewMode === "list" && (
                        <Button
                          onClick={() =>
                            addToCart(
                              product.id,
                              product.image,
                              product.nom,
                              product.prix
                            )
                          }
                          className="w-full bg-purple-600 hover:bg-purple-700 mt-4 cursor-pointer"
                        >
                          Ajouter au panier
                        </Button>
                      )}
                    </div>
                  </CardContent>

                  {viewMode === "grid" && (
                    <CardFooter className="p-4 pt-0">
                      <Button
                        onClick={() =>
                          addToCart(
                            product.id,
                            product.image,
                            product.nom,
                            product.prix
                          )
                        }
                        className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer"
                      >
                        Ajouter au panier
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>

            {/* Message si aucun produit */}
            {/* {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">
                  Aucun produit trouvé avec ces filtres
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategories(new Set());
                    setPriceRange([0, 100000]);
                  }}
                  variant="outline"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )} */}
          </main>
        </div>
      </div>
    </div>
  );
}
