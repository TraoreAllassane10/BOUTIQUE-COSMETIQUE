import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetProduitsQuery,
  useCreateProduitMutation,
  useDeleteProduitMutation,
} from "@/store/api/produitApi";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "@/store/api/categorieApi";
import { useState } from "react";
import PaginationBar from "@/components/PaginationBar";
import { DonneesParPage } from "@/utlis/pagination";

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

interface categorie {
  id: string;
  nom: string;
}

// Schema validation du formulaire
const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  prix: z.string().min(1, "Le prix doit être un nombre positif"),
  stock: z.string().min(1, "Le stock doit être un nombre positif"),
  category_id: z.string().min(1, "Selectionner une catégorie"),
  image: z
    .custom<FileList>((value) => value instanceof FileList, {
      message: "Veuillez télécharger une image",
    })
    .refine((files) => files.length > 0, {
      message: "Aucun fichier séléctionné",
    })
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type),
      {
        message: "L'image doit être en JPG ou PNG ou JPEG.",
      }
    ),
});

type FormData = z.infer<typeof formSchema>;

const Produit = () => {

  const navigate = useNavigate();

  // State de recherche
  const [search, setSearch] = useState("");
  const [categorieFiltre, setCategorieFiltre] = useState("0");

  // Chargement des produits (La data changement lorsque nous mettons search à jour)
  const { data, isLoading } = useGetProduitsQuery({ search, categorie: categorieFiltre });

  // Chargement des categories depuis L'API
  const { data: categorieData } = useGetCategoriesQuery(undefined);

  // Mutayion de suppression de produit
  const [deleteProduit, { error: deleteError }] = useDeleteProduitMutation();

  // Mutation pour creer un produit
  const [createProduit, { error: createError }] = useCreateProduitMutation();

  // Validation du formulaire
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      description: "",
      prix: "",
      stock: "",
      image: undefined,
    },
  });

  // Soumission du formulaire
  const onsubmit = async (data: FormData) => {
    try {
      console.log(data);

      const formData = new FormData();

      formData.append("nom", data.nom);
      formData.append("description", data.description);
      formData.append("prix", data.prix);
      formData.append("stock", data.stock);
      formData.append("category_id", data.category_id);
      formData.append("image", data.image[0]);

      // Creation de produit
      await createProduit(formData).unwrap();

      if (!createError) {
        toast.success("Produit créé avec succès !");
        navigate(0);
      }

      reset();
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
    }
  };

  // Suppression d'un produit
  const handleDelete = async (id: number) => {
    await deleteProduit(id).unwrap();

    if (!deleteError) {
      navigate(0);
      toast.success("Produit supprimé avec succès !");
    }
  };

 
  // SYSTEME DE PAGINATION
  // La page courante
  const [currentPage, setCurrenPage] = useState(1);

  // Recuperation des données par page et le total de page
  const [produitActuel, totalPage] = DonneesParPage(data?.data, currentPage);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between place-items-center mb-6">
          <h1 className="text-3xl text-slate-800 font-bold">Produits</h1>

          <Sheet>
            <SheetTrigger asChild>
              {/* <Button variant="outline">Open</Button> */}
              <Button className="cursor-pointer rounded-full">
                Ajouter un Produit
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Enregistrer un Produit</SheetTitle>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Nom du produit</Label>
                  <Input {...register("nom")} />
                  {errors.nom && (
                    <div className="text-red-500 text-sm">
                      {errors.nom.message}
                    </div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Description</Label>
                  <Textarea {...register("description")}> </Textarea>
                  {errors.description && (
                    <div className="text-red-500 text-sm">
                      {errors.description.message}
                    </div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Prix</Label>
                  <Input type="number" {...register("prix")} />
                  {errors.prix && (
                    <div className="text-red-500 text-sm">
                      {errors.prix.message}
                    </div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Stock</Label>
                  <Input type="number" {...register("stock")} />
                  {errors.stock && (
                    <div className="text-red-500 text-sm">
                      {errors.stock.message}
                    </div>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label>Catégorie</Label>
                  <select
                    {...register("category_id")}
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  >
                    <option value=""></option>
                    {categorieData?.data.map((categorie: categorie) => (
                      <option value={categorie.id} key={categorie.id}>
                        {categorie.nom}
                      </option>
                    ))}
                  </select>

                  {errors.category_id && (
                    <p className="text-red-500 text-sm">
                      {errors.category_id.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Image</Label>
                  <Input type="file" {...register("image")} />
                  {errors.image && (
                    <div className="text-red-500 text-sm">
                      {errors.image.message}
                    </div>
                  )}
                </div>
              </div>
              <SheetFooter>
                <Button onClick={handleSubmit(onsubmit)}>
                  {isSubmitting ? "Enregistrement...." : "Enregister"}
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
            <Input
              type="search"
              placeholder="Recherche"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/4"
            />

            <div className="flex gap-2 place-items-center">
              <p>Catégorie : </p>
              <Select onValueChange={(value) => setCategorieFiltre(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Non selectionne</SelectItem>
                  {categorieData?.data.map((categorie: categorie) => (
                    <SelectItem value={categorie.id.toString()}>
                      {categorie.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="w-full">
            <Table className="w-full">
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead className="w-[100px]">Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock total</TableHead>
                  <TableHead>Catégorie</TableHead>
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
                  produitActuel.map((produit: Produit) => (
                    <TableRow key={produit.id} className="text-gray-500">
                      <TableCell>
                        <img
                          src={`http://127.0.0.1:8000/storage/${produit.image}`}
                          alt={produit.nom}
                          className="w-16 h-16 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {produit.nom}
                      </TableCell>
                      <TableCell>
                        {produit.prix.toLocaleString("XOF")} fcfa
                      </TableCell>
                      <TableCell>{produit.stock}</TableCell>
                      <TableCell>{produit.category?.nom}</TableCell>
                      <TableCell className="flex gap-2">
                        <Link to={`/produit/${produit.id}/show`}>
                          <Eye className="text-yellow-500" />
                        </Link>
                        <Link to={`/produit/${produit.id}`}>
                          <Edit className="text-blue-500" />
                        </Link>
                        <a
                          onClick={() => handleDelete(produit.id)}
                          className="cursor-pointer"
                        >
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

          <CardFooter>
           {
            data?.data &&  <PaginationBar data={produitActuel} currentPage={currentPage} setCurrentPage={setCurrenPage} totalPage={totalPage} />
           }
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Produit;
