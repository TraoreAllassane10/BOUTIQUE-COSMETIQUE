import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetProduitByIdQuery } from "@/store/api/produitApi";
import { useParams } from "react-router-dom";

const ShowProduit = () => {
  // Recuperation de l'ID du prdouit depuis l'URL
  const { id } = useParams();

  const { data, isLoading } = useGetProduitByIdQuery(id);

  if (data) console.log(data);
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
                    <span className="text-primary text-md mb-2">{data?.data.category?.nom}</span>
                    <h3 className="text-3xl text-gray-600 mb-4">{data?.data.nom}</h3>

                    <hr />

                    <div className="flex flex-col gap-2">
                        <h3 className="text-black text-xl font-medium mt-4">Description</h3>
                        <p className="text-gray-500">
                            {data?.data.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <p >Stock Disponible : <span className="text-xl font-bold">{data?.data.stock}</span></p> 
                        <p>Prix : <span className="text-xl font-bold">{data?.data.prix} fcfa</span></p> 
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
