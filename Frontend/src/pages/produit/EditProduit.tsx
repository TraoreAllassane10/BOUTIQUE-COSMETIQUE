import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetCategoriesQuery } from "@/store/api/categorieApi";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  useGetProduitByIdQuery,
  useUpdateProduitMutation,
} from "@/store/api/produitApi";
import { Textarea } from "@/components/ui/textarea";

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
    .union([
      z.string(), // image déjà existante
      z.custom<FileList>((val) => val instanceof FileList, {
        message: "Format invalide",
      }),
    ])
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        if (typeof value === "string") return true;
        return (
          value.length > 0 &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        );
      },
      { message: "L'image doit être JPG ou PNG." }
    ),
});
type FormData = z.infer<typeof formSchema>;

const EditProduit = () => {
  const navigate = useNavigate();

  // Recupération de l'ID du produit depuis les paramètres de l'URL
  const { id } = useParams();

  // Chargement des données de la catégorie par son ID
  const { data, isLoading, error } = useGetProduitByIdQuery(id);

  // Chargement des categories depuis L'API
  const { data: categorieData } = useGetCategoriesQuery(undefined);

  const [updateProduit, { isLoading: updateLoading }] =
    useUpdateProduitMutation();

  // Erreur de chargement
  if (error) {
    toast.error("Une erreur est survenue lors du chargement du produit");
    navigate("/produit");
  }

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
      prix: undefined,
      stock: undefined,
      image: undefined,
      category_id: undefined,
    },
  });

  // Mettre à jours le champs quand les données arrivent
  useEffect(() => {
    if (data) {
      reset({
        nom: data?.data.nom,
        description: data?.data.description,
        prix: data?.data.prix.toString(),
        stock: data?.data.stock.toString(),
        category_id: data?.data.category_id.toString(),
        image: data.data.image,
      });
    }
  }, [data, reset]);

  // Soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      formData.append("nom", data.nom);
      formData.append("description", data.description);
      formData.append("prix", data.prix);
      formData.append("stock", data.stock);
      formData.append("category_id", data.category_id);

      // N'envoyer l'image QUE si une nouvelle est sélectionnée
      if (
        data.image &&
        data.image instanceof FileList &&
        data.image.length > 0
      ) {
        formData.append("image", data.image[0]);
      }
      // Sinon, ne rien envoyer (le backend gardera l'ancienne)

      await updateProduit({ id: id as string, formData }).unwrap();

      toast.success("Produit mis à jour avec succès !");
      navigate("/produit");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour du produit");
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between place-items-center mb-6">
          {isLoading ? (
            <p>Chargement en cours...</p>
          ) : (
            <Card className="max-w-7xl w-full p-4">
              <h1 className="text-2xl font-bold mb-4">Modifier le produit</h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full"
                encType="multipart/form-data"
              >
                <div className="grid gap-3">
                  <Label>Nom</Label>
                  <Input {...register("nom")} className="w-full" />
                  <p className="text-sm text-red-500">{errors?.nom?.message}</p>
                </div>

                <div className="grid gap-3">
                  <Label>Description</Label>
                  <Textarea {...register("description")} className="w-full" />
                  <p className="text-sm text-red-500">
                    {errors?.description?.message}
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label>Prix</Label>
                  <Input
                    type="number"
                    {...register("prix")}
                    className="w-full"
                  />
                  <p className="text-sm text-red-500">
                    {errors?.prix?.message}
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    {...register("stock")}
                    className="w-full"
                  />
                  <p className="text-sm text-red-500">
                    {errors?.stock?.message}
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label>Catégorie</Label>
                  <select
                    {...register("category_id")}
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  >
                    <option value=""></option>
                    {categorieData?.data.map((categorie: categorie) => (
                      <option
                        value={categorie.id}
                        key={categorie.id}
                        selected={data?.data.category_id === categorie.id}
                      >
                        {categorie.nom}
                      </option>
                    ))}
                  </select>

                  {errors.category_id && (
                    <p className="text-red-500 text-sm">
                      {errors.category_id.message}
                    </p>
                  )}
                  <p className="text-sm text-red-500">{errors?.nom?.message}</p>
                </div>

                <div className="grid gap-3">
                  <Label>Image</Label>
                  <Input
                    type="file"
                    {...register("image")}
                    className="w-full"
                  />
                  <p className="text-sm text-red-500">
                    {errors?.image?.message}
                  </p>
                </div>

                <div>
                  <img
                    src={`http://127.0.0.1:8000/storage/${data?.data.image}`}
                    alt={data?.data.nom}
                    className="object-cover rounded"
                    width={100}
                    height={100}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 cursor-pointer"
                >
                  {updateLoading ? "Mise à jour..." : "Mettre à jour"}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditProduit;
