import { ChevronRight, Heart, Star } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"

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

interface ProductSection {
    productData: {
        data: Produit[]
    }
}

const ProductSection = ({productData}: ProductSection) => {
  return (
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
                  {/* <button
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
                  </button> */}
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
  )
}

export default ProductSection