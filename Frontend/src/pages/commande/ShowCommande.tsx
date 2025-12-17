import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetCommandeByIdQuery } from "@/store/api/commandeApi";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Wallet, Package } from "lucide-react";

const ShowCommande = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCommandeByIdQuery(id);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">Chargement...</div>
      </DashboardLayout>
    );
  }

  const commande = data?.data;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Détails de la commande</h1>
          <p className="text-muted-foreground">
            Consultation des informations et produits commandés
          </p>
        </div>

        {/* Infos commande */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <User className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-semibold">{commande?.user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold">{commande?.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Wallet className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Montant</p>
                <p className="font-semibold">{commande?.montant} FCFA</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Package className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <Badge variant="secondary">{commande?.statut}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Produits */}
        <Card>
          <CardHeader>
            <CardTitle>Produits commandés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {commande?.produits.map((produit) => (
              <div
                key={produit.id}
                className="flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/40 transition"
              >
                <img
                  src={`http://localhost:8000/storage/${produit.image}`}
                  alt={produit.nom}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-semibold">{produit.nom}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantité : {produit.pivot.quantite}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">{produit.prix} FCFA</p>
                  <p className="text-sm text-muted-foreground">
                    Total : {produit.prix * produit.pivot.quantite} FCFA
                  </p>
                </div>
              </div>
            ))}

            <Separator />

            <div className="flex justify-end">
              <p className="text-xl font-bold">
                Total commande : {commande?.montant} FCFA
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ShowCommande;