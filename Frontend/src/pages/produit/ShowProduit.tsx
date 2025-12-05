import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteProduitMutation,
  useGetProduitByIdQuery,
} from "@/store/api/produitApi";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShowProduit = () => {
  const navigate = useNavigate();

  // Recuperation de l'ID du prdouit depuis l'URL
  const { id } = useParams();

  const { data, isLoading } = useGetProduitByIdQuery(id);

  const [deleteProduit, { error: deleteError }] = useDeleteProduitMutation();

  const handleDelete = async (id: number) => {
    await deleteProduit(id).unwrap();

    if (!deleteError) {
      navigate("/produit");
      toast.success("Produit supprimé avec succès !");
    }
  };
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between place-items-center mb-6">
          {isLoading ? (
            <p>Chargement en cours...</p>
          ) : (
            <Card className="w-full">
              <CardContent>
                {" "}
                <h1 className="text-3xl text-slate-800 font-bold">
                  Détail du produit
                </h1>
                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div>
                    <img
                      src={`http://localhost:8000/storage/${data?.data.image}`}
                      alt={data?.data.nom}
                      className="object-cover"
                      width={300}
                      height={300}
                    />
                  </div>

                  <div>
                    <span className="text-primary text-md mb-2">
                      {data?.data.category?.nom}
                    </span>
                    <h3 className="text-3xl text-gray-600 mb-4">
                      {data?.data.nom}
                    </h3>

                    <hr />

                    <div className="flex flex-col gap-2">
                      <h3 className="text-black text-xl font-medium mt-4">
                        Description
                      </h3>
                      <p className="text-gray-500">{data?.data.description}</p>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                      <p>
                        Stock Disponible :{" "}
                        <span className="text-xl font-bold">
                          {data?.data.stock}
                        </span>
                      </p>
                      <p>
                        Prix :{" "}
                        <span className="text-xl font-bold">
                          {data?.data.prix} fcfa
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Link
                        to={`/produit/${data?.data.id}`}
                        className="bg-blue-500 text-center text-white p-1 rounded hover:bg-blue-700 transition"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(data?.data.id)}
                        className="bg-red-500 cursor-pointer text-center text-white p-1 rounded hover:bg-red-700 transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShowProduit;
