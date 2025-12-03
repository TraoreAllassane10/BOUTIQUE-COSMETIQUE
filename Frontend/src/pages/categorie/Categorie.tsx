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
import {
  useCreateCategorieMutation,
  useGetCategoriesQuery,
} from "@/store/api/categorieApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Categorie {
  id: number;
  nom: string;
}

const formSchema = z.object({
  nom: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
});

type FormData = z.infer<typeof formSchema>;

const Categorie = () => {
  const navigate = useNavigate();

  // Chargement des categories depuis L'API
  const { data, isLoading } = useGetCategoriesQuery(undefined);

  // Mutation pour créer une nouvelle catégorie
  const [createCategorie, { isLoading: createLoading, error: createError }] =
    useCreateCategorieMutation();

  //Validation du formulaire d'ajout de catégorie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
    },
  });

  // Soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {
      // Creation de la categorie via l'API
      await createCategorie({ nom: data.nom }).unwrap();

      // S'il n'y a pas d'erreur
      if (!createError) {
        toast.success("Catégorie créée avec succès !");

        // Rafraichir la page
        navigate(0);
      }

      // Réinitialiser le formulaire
      reset();
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la création de la catégorie"
      );
      console.error(error);
    }
  };

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
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Nom de la Catégorie</Label>
                  <Input {...register("nom")} />
                  <p className="text-sm text-red-500">{errors?.nom?.message}</p>
                </div>
              </div>
              <SheetFooter>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={createLoading}
                >
                  Enregister
                </Button>
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
                {isLoading ? (
                  <TableCell colSpan={2}>Chargement en cours...</TableCell>
                ) : (
                  data?.data.map((categorie: Categorie) => (
                    <TableRow key={categorie.id} className="text-gray-500">
                      <TableCell className="font-medium">
                        {categorie.nom}
                      </TableCell>

                      <TableCell className="flex gap-2 float-right px-8">
                        <a href="">
                          <Eye />
                        </a>
                        <a href={`categorie/${categorie.id}`}>
                          <Edit />
                        </a>
                        <a href="">
                          <Trash />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Categorie;
