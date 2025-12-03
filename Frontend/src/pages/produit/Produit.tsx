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
import { Edit, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useGetProduitsQuery } from "@/store/api/produitApi";

interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  image: string;
}

const Produit = () => {

  // Chargement des produits
  const { data, isLoading } = useGetProduitsQuery();

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between place-items-center mb-6">
          <h1 className="text-3xl text-slate-800 font-bold">Clients</h1>

          <Sheet>
            <SheetTrigger asChild>
              {/* <Button variant="outline">Open</Button> */}
              <Button className="cursor-pointer rounded-full">
                Ajouter un client
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Enregistrer un client</SheetTitle>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Nom Complet</Label>
                  <Input id="sheet-demo-name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Email</Label>
                  <Input type="email" id="sheet-demo-username" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Telephone</Label>
                  <Input type="number" id="sheet-demo-username" />
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
            <Input type="search" placeholder="Recherche" className="w-1/4" />

            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">A-Z</SelectItem>
                  <SelectItem value="system">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="w-full">
            <Table className="w-full">
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead className="w-[100px]">Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock total</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Chargement en cours...
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data.map((produit: Produit) => (
                    <TableRow key={produit.id} className="text-gray-500">
                      <TableCell className="font-medium">
                        {produit.nom}
                      </TableCell>
                      <TableCell>
                        {produit.prix.toLocaleString("XOF")} fcfa
                      </TableCell>
                      <TableCell>{produit.stock}</TableCell>
                      <TableCell>{produit.image}</TableCell>
                      <TableCell className="flex gap-2">
                        <a href="">
                          <Eye className="text-yellow-500" />
                        </a>
                        <a href="" >
                          <Edit className="text-blue-500" />
                        </a>
                        <a href="">
                          <Trash className="text-red-500" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}

                {}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Produit;
