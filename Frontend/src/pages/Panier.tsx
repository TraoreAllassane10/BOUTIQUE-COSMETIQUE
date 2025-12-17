import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Lock,
  Tag,
  Gift,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  updateQuantityProduct,
  removeCart,
  addCart,
  clearCart
} from "../store/slices/cartSlice";
import { useGetProduitsQuery } from "@/store/api/produitApi";
import { useCreateCommandeMutation } from "@/store/api/commandeApi";
import toast from "react-hot-toast";

interface Product {
  id: number;
  nom: string;
  image: string;
  quantite: number;
  prix: number;
}

export default function Panier() {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: productsData } = useGetProduitsQuery({
    search: "",
    categorie: "",
  });

  // Recuperation du state global products
  const products: Product[] = useSelector(selectProducts);

  // Modification de la quantite d'un produit
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeCart(id));
      return;
    }

    dispatch(updateQuantityProduct({ id, quantite: newQuantity }));
  };

  // Supression d'un produit du panier
  const removeItem = (id: number) => {
    dispatch(removeCart({ id }));
  };

  // Application d'une reduction avec le code promo
  const applyPromo = () => {
    if (promoCode.toUpperCase() === "HIVER10") {
      setPromoApplied(true);
    }
  };

  // Calcule du subtotal
  const subtotal = products.reduce(
    (sum, item) => sum + item.prix * item.quantite,
    0
  );

  // Calcule de la reduction
  const discount = useMemo(() => {
    return promoApplied ? subtotal * 0.1 : 0;
  }, [promoApplied, subtotal]);

  // Livraison gratuit si subtotal est depasse 50.0000
  const shipping = useMemo(() => {
    return subtotal > 50000 ? 0 : 1000;
  }, [subtotal]);

  // Calucle du grand total
  const total = useMemo(() => {
    return subtotal - discount + shipping;
  }, [subtotal, discount, shipping]);

  // Recommandation de 3 produits
  const recommendedProducts = productsData?.data.slice(0, 3);

  // Ajout d'un produit recommandé au panier
  const addToCart = (id: number, image: string, nom: string, prix: number) => {
    dispatch(addCart({ id, image, nom, prix }));
  };

  // PASSATION DE LA COMMANDE
  const [createCommande, { error: commandeError, isLoading: commandeLoading }] =
    useCreateCommandeMutation();

  const handleCommande = async () => {

    // Verifie si le panier est vide
    if (!total && total <= 0) {
      toast.error("Veuillez aujouté au moins un produit dans le panier");
      return;
    }

    // Recuperation des id et quantité des produits du panier
    const panier = products.map((product) => {
      return { id: product.id, quantite: product.quantite };
    });

    // Creation d'une nouvelle commande
    await createCommande({panier, montant: total}).unwrap();

    // Si une erreur survient
    if (commandeError)
    {
      toast.error("Une erreur est survenue lors de la création d'une commande");
      return ;
    }

    // Vidange du panier
    dispatch(clearCart());

    toast.success("Commande enregistrée avec succès !");
    
    navigate("/");
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
            <span className="text-gray-900 font-semibold">Panier</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton retour */}
        <Link
          to="/produits"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continuer mes achats
        </Link>

        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Mon Panier ({products.reduce((sum, item) => sum + item.quantite, 0)}{" "}
          articles)
        </h1>

        {products.length === 0 ? (
          // Panier vide
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Votre panier est vide
              </h2>
              <p className="text-gray-600 mb-6">
                Découvrez nos produits et commencez vos achats
              </p>
              <Link
                to="/produits"
                className="bg-purple-600 hover:bg-purple-700 p-2 text-white rounded"
              >
                Découvrir nos produits
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-4">
              {/* Bannière livraison gratuite */}
              {subtotal < 50 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-blue-900">
                        Plus que <strong>{(50 - subtotal).toFixed(2)}€</strong>{" "}
                        pour bénéficier de la livraison gratuite !
                      </p>
                    </div>
                    <div className="mt-2 bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((subtotal / 50) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {products?.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:8000/storage/${item.image}`}
                          alt={item.nom}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Informations */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {item.nom}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                          {/* Quantité */}
                          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantite - 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold">
                              {item.quantite}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantite + 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Prix */}
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {(item.prix * item.quantite).toLocaleString(
                                "fr-FR"
                              )}{" "}
                              fcfa
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.prix.toLocaleString("fr-FR")} fcfa / unité
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Résumé de la commande */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Code promo */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Code promo
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="HIVER10"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="flex-1"
                      />
                      <Button
                        onClick={applyPromo}
                        variant={promoApplied ? "secondary" : "outline"}
                        disabled={promoApplied}
                      >
                        {promoApplied ? "✓" : "Appliquer"}
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        Code promo appliqué !
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Détails */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Sous-total</span>
                      <span className="font-semibold">
                        {subtotal.toLocaleString("fr-FR")} fcfa
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Réduction (-10%)</span>
                        <span className="font-semibold">
                          -{discount.toLocaleString("fr-FR")} fcfa
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-700">
                      <span>Livraison</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700"
                          >
                            Gratuite
                          </Badge>
                        ) : (
                          `${shipping.toLocaleString("fr-FR")} fcfa`
                        )}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">
                      {total.toLocaleString("fr-FR")} fcfa
                    </span>
                  </div>

                  {/* Boutons */}
                  <Button
                    onClick={handleCommande}
                    disabled={commandeLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg cursor-pointer"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    {commandeLoading ? "Traitement..." : "Passer la commande"}
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" />
                      Paiement 100% sécurisé
                    </p>
                    <div className="flex justify-center gap-2 opacity-60">
                      <span className="text-xs">💳 Visa</span>
                      <span className="text-xs">💳 Mastercard</span>
                      <span className="text-xs">💳 PayPal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Garanties */}
              <Card className="mt-4">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Livraison rapide</p>
                      <p className="text-xs text-gray-600">2-3 jours ouvrés</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">↩️</span>
                    <div>
                      <p className="font-semibold text-sm">Retours gratuits</p>
                      <p className="text-xs text-gray-600">
                        30 jours pour changer d'avis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Paiement sécurisé</p>
                      <p className="text-xs text-gray-600">
                        Vos données protégées
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Produits recommandés */}
        {products.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product: Product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <img
                      src={`http://localhost:8000/storage/${product.image}`}
                      alt={product.nom}
                      className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                    />
                    <h3 className="font-semibold mb-2">{product.nom}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        {product.prix} fcfa
                      </span>
                      <Button
                        onClick={() =>
                          addToCart(
                            product.id,
                            product.image,
                            product.nom,
                            product.prix
                          )
                        }
                        variant="outline"
                        size="sm"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
