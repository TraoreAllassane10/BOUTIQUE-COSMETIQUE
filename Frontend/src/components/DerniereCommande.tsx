
import { useGetDataDashboardQuery } from "@/store/api/dashboardApi";
import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Commande {
  id: number;
  date: string;
  statut: string;
  montant: number;
  user: {
    id: number;
    name: string;
  };
}

const DerniereCommande = () => {
  const {data} = useGetDataDashboardQuery(undefined)

  return (
     <Card>
     
          <CardContent className="w-full">
            <Table className="w-full">
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead className="w-[100px]">Commande</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.dernieresCommandes.map((commande: Commande) => (
                  <TableRow key={commande.id} className="text-gray-500">
                    <TableCell className="font-medium">
                      CM00{commande.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {commande.date}
                    </TableCell>
                    <TableCell>{commande.user.name}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          commande.statut === "expediée" &&
                          "bg-green-50  text-green-500 rounded-lg border border-green-500 font-medium"
                        } ${
                          commande.statut === "en cours" &&
                          "bg-yellow-50  text-yellow-500 rounded-lg border border-yellow-500 font-medium"
                        }
                          ${
                            commande.statut === "préparée" &&
                            "bg-blue-50  text-blue-500 rounded-lg border border-blue-500 font-medium"
                          }blue
                           ${
                             commande.statut === "annulée" &&
                             "bg-red-50 text-red-500 rounded-lg border border-red-500 font-medium"
                           } text-xs p-1`}
                      >
                        {commande.statut}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="">
                        {commande.montant.toLocaleString("XOF")} fcfa
                      </span>
                    </TableCell>

          
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>

      
        </Card>
  );
};

export default DerniereCommande;
