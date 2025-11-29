import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

import { ListeCommandes } from "@/database/data";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";



const Commande = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const clientParPage = 10;

  // Calcule d'indice
  const indexDernierClient = currentPage * clientParPage;
  const indexPremierClient = indexDernierClient - clientParPage;
  const CommandesActuelle = ListeCommandes.slice(
    indexPremierClient,
    indexDernierClient
  );

  // Calculer le nombre de page
  const totalPages = Math.ceil(ListeCommandes.length / clientParPage);

  // Fonctions de navigation
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between place-items-center mb-6">
          <h1 className="text-3xl text-slate-800 font-bold">Commandes</h1>

          <Sheet>
            <SheetTrigger asChild>
              {/* <Button variant="outline">Open</Button> */}
              <Button className="cursor-pointer rounded-full">
                Ajouter une commande
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Enregistrer une commande</SheetTitle>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Client</Label>
                  <Input id="sheet-demo-name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Date</Label>
                  <Input type="date" id="sheet-demo-username" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Paiement</Label>
                  <select
                    name=""
                    id=""
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="">Selectionner le statut de paiement</option>
                    <option value="">Payé</option>
                    <option value="">En attente</option>
                    <option value="">Echoué</option>
                  </select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Total</Label>
                  <Input type="number" id="sheet-demo-name" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Livraison</Label>
                  <select
                    name=""
                    id=""
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="">
                      Selectionner le statut de livraison
                    </option>
                    <option value="">Payé</option>
                    <option value="">En attente</option>
                    <option value="">Echoué</option>
                  </select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Mode paiement</Label>
                  <select
                    name=""
                    id=""
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="">Selectionner le mode de paiement</option>
                    <option value="">Mobile Money</option>
                    <option value="">Carte banciare</option>
                    <option value="">Virément</option>
                    <option value="">Espèces</option>
                  </select>
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Enregister</Button>
                <SheetClose asChild>
                  <Button variant="outline">Fermer</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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
                  <SelectItem value="payé">Payé</SelectItem>
                  <SelectItem value="en attend">En attente</SelectItem>
                  <SelectItem value="echoué">Echoué</SelectItem>
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
                  <TableHead>paiement</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Livraison</TableHead>
                  <TableHead>Mode de paiement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CommandesActuelle?.map((commande) => (
                  <TableRow key={commande.id} className="text-gray-500">
                    <TableCell className="font-medium">{commande.id}</TableCell>
                    <TableCell className="font-medium">
                      {commande.date}
                    </TableCell>
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
                    <TableCell className="flex gap-2">
                      <a href="">
                        <Eye />
                      </a>
                      <a href="">
                        <Edit />
                      </a>
                      <a href="">
                        <Trash />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}

                <div className="my-8">
                  <div className="flex gap-2 ">
                    <Button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="bg-transparent text-black border border-gray-300 hover:text-white cursor-pointer"
                    >
                      Precédent
                    </Button>

                    <p className="text-sm text-gray-600">
                      Page {currentPage} / {totalPages}
                    </p>

                    <Button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="bg-transparent text-black border border-gray-300 hover:text-white cursor-pointer"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Commande;
