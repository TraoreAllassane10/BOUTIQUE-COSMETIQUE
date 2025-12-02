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
import { useGetCategoriesQuery } from "@/store/api/categorieApi";

interface Categorie {
  id: number;
  nom: string;
}

const Categorie = () => {

  const { data, isLoading, error } = useGetCategoriesQuery();


  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between place-items-center mb-6">
          <h1 className="text-3xl text-slate-800 font-bold">Catégories</h1>
        {/* {
          errors && <p className="text-red-500">Erreur lors du chargement des catégories</p>
        } */}
          <Sheet>
            <SheetTrigger asChild>
              {/* <Button variant="outline">Open</Button> */}
              <Button className="cursor-pointer rounded-full">
                Ajouter une catégorie
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Enregistrer un catégorie</SheetTitle>
                {/* <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription> */}
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Nom de la Catégorie</Label>
                  <Input  />
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
                  <TableHead className="float-right px-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((categorie: Categorie) => (
                  <TableRow key={categorie.id} className="text-gray-500">
                    <TableCell className="font-medium">{categorie.nom}</TableCell>
          
                    <TableCell className="flex gap-2 float-right px-8">
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

                {/* <div className="my-8">
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
                </div> */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Categorie;
