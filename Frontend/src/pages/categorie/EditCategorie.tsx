import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetCategorieByIdQuery,
  useUpdateCategorieMutation,
} from "@/store/api/categorieApi";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";

const formSchema = z.object({
  nom: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
});

type FormData = z.infer<typeof formSchema>;

const EditCategorie = () => {
  const navigate = useNavigate();

  // Recupération de l'ID de la catégorie depuis les paramètres de l'URL
  const { id } = useParams();

  // Chargement des données de la catégorie par son ID
  const { data, isLoading, error } = useGetCategorieByIdQuery(id);

  const [updateCategorie, { isLoading: updateLoading, error: updateError }] =
    useUpdateCategorieMutation();

  // Erreur de chargement
  if (error) {
    toast.error("Une erreur est survenue lors du chargement de la catégorie");
    navigate("/categorie");
  }

  // Initailisation du formulaire
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
    },
  });

  // Mettre à jours le champs quand les données arrivent
  useEffect(() => {
    if (data) {
      reset({
        nom: data?.data.nom,
      });
    }
  }, [data, reset]);

  // Soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {

      // Mise à jour de la catégorie via l'API
      await updateCategorie({id: id as string, nom: data.nom}).unwrap();

      if (!updateError) {
        toast.success("Catégorie mise à jour avec succès !");

        // Redirection vers la liste des catégories
        navigate("/categorie");
      }

    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la mise à jour de la catégorie"
      );
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
              <h1 className="text-2xl font-bold mb-4">Modifier la catégorie</h1>
              <form className="flex flex-col gap-2 w-full">
                <Label>Nom de la catégorie</Label>
                <Input {...register("nom")} className="w-full" />
                <p className="text-sm text-red-500">{errors?.nom?.message}</p>

                <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="mt-4 cursor-pointer">{updateLoading ? "Mise à jour..." : "Mettre à jour"}</Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditCategorie;
