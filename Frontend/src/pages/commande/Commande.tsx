import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, Edit, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import {
  useDeleteCommandeMutation,
  useGetCommandesQuery,
} from "@/store/api/commandeApi";
import { DonneesParPage } from "@/utlis/pagination";
import PaginationBar from "@/components/PaginationBar";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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

const Commande = () => {
  const { data: commandeData } = useGetCommandesQuery(undefined);
  const navigate = useNavigate();

  // SYSTEME DE PAGINATION
  // La page courante
  const [currentPage, setCurrenPage] = useState(1);

  // Recuperation des données par page et le total de page
  const [CommandesActuelle, totalPage] = DonneesParPage(
    commandeData?.data,
    currentPage
  );

  // Suppression d'une commande
  const [deleteCommande, { error: errorDeleteCommande }] =
    useDeleteCommandeMutation();

  const handleDelete = async (id: number) => {
    await deleteCommande(id).unwrap;

    if (errorDeleteCommande) {
      toast.error("Erreur survenue lors de la création d'une commande");
      return;
    }

    toast.success("Commande supprimée avec succès !");

    navigate("/commande");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between place-items-center mb-6">
          <h1 className="text-3xl text-slate-800 font-bold">Commandes</h1>
        </div>

        <Card>
          <CardHeader className="flex justify-between">
            <Input type="search" placeholder="Recherche" className="w-3/4" />

            <div className="flex gap-2 ">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Non selectionne</SelectItem>
                  <SelectItem value="en cours">en cours</SelectItem>
                  <SelectItem value="préparée">préparée</SelectItem>
                  <SelectItem value="expediée">expediée</SelectItem>
                </SelectContent>
              </Select>

              <Button className="cursor-pointer bg-slate-700 hover:bg-slate-700/80">
                <Book /> Exporter
              </Button>
            </div>
          </CardHeader>

          <CardContent className="w-full">
            <Table className="w-full">
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead className="w-[100px]">Commande</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Montant</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CommandesActuelle?.map((commande: Commande) => (
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

                    <TableCell className="flex gap-2">
                      <Link to={`/commande/${commande.id}/show`} className="cursor-pointer text-yellow-500">
                        <Eye />
                      </Link>
              
                      <button
                        onClick={() => handleDelete(commande.id)}
                        className="cursor-pointer text-red-500"
                      >
                        <Trash />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter>
            {commandeData?.data && (
              <PaginationBar
                data={CommandesActuelle}
                currentPage={currentPage}
                setCurrentPage={setCurrenPage}
                totalPage={totalPage}
              />
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Commande;
