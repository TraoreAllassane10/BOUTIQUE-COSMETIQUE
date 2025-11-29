import { ListeCommandes } from "@/database/data";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const DerniereCommande = () => {
  const commandes = ListeCommandes.slice(
        ListeCommandes.length - 5,
    ListeCommandes.length
  );

  console.log(commandes)

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h1>5 Dernières commandes</h1>
      </CardHeader>

      <CardContent className="w-full">
        <Table className="w-full">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="w-[100px]">Commande</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>paiement</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Livraison</TableHead>
              <TableHead>Mode de paiement</TableHead>
      
            </TableRow>
          </TableHeader>
          <TableBody>
            {commandes?.map((commande) => (
              <TableRow key={commande.id} className="text-gray-500">
                <TableCell className="font-medium">{commande.id}</TableCell>
                <TableCell className="font-medium">{commande.date}</TableCell>
                <TableCell>{commande.client}</TableCell>
                <TableCell>
                  <span
                    className={`${
                      commande.paiement === "Payé" &&
                      "bg-green-50  text-green-500 rounded-lg border border-green-500 font-medium"
                    } ${
                      commande.paiement === "En attente" &&
                      "bg-yellow-50  text-yellow-500 rounded-lg border border-yellow-500 font-medium"
                    } ${
                      commande.paiement === "Échoué" &&
                      "bg-red-50 text-red-500 rounded-lg border border-red-500 font-medium"
                    } text-xs p-1`}
                  >
                    {commande.paiement}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="">
                    {commande.total.toLocaleString("XOF")} fcfa
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      commande.livraison === "Livré" &&
                      "bg-green-50  text-green-500 rounded-lg border border-green-500 font-medium"
                    } ${
                      commande.livraison === "En cours" &&
                      "bg-yellow-50  text-yellow-500 rounded-lg border border-yellow-500 font-medium"
                    } ${
                      commande.livraison === "Annulé" &&
                      "bg-red-50 text-red-500 rounded-lg border border-red-500 font-medium"
                    } text-xs p-1`}
                  >
                    {commande.livraison}
                  </span>
                </TableCell>
                <TableCell>{commande.modePaiement}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DerniereCommande;
