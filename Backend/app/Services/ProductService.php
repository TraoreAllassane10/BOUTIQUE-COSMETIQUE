<?php

namespace App\Services;

use App\DTO\Product\CreateProductDTO;
use App\DTO\Product\UpdateProductDTO;
use App\Http\Requests\Product\ProductStoreRequest;
use Exception;
use App\Repositories\ProductRespository;

class ProductService
{

    public function __construct(
        public ProductRespository $productRespository
    ) {}

    public function all()
    {

        try {

            // Recuperation de tous les produits
            $products = $this->productRespository->all();

            return response()->json([
                'success' => true,
                'message' => 'La liste des produits',
                'data' => $products
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function find(string $id)
    {
        try {
            $product = $this->productRespository->find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Produit introuvable',
                ]);
            }


            return response()->json([
                'success' => true,
                'message' => 'Produit trouvé',
                'data' => $product
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function create(CreateProductDTO $dto)
    {
        try {

            $product = $this->productRespository->create([
                "nom" => $dto->nom,
                "description" => $dto->description,
                "prix" => $dto->prix,
                "stock" => $dto->stock,
                "image" => $dto->image,
                "category_id" => $dto->category_id
            ]);

            // Erreur lors de l'insertion
            if (!$product) {
                return response()->json([
                    'sucess' => false,
                    'message' => 'Erreur survenue lors de l\'insertion',
                ]);
            }

            return response()->json([
                'sucess' => true,
                'message' => 'Produit crée',
                'data' => $product
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function update(UpdateProductDTO $dto, string $id)
    {
        try {
            $product = $this->productRespository->find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Produit introuvable',
                ]);
            }


            $product = $this->productRespository->update($product, [
                "nom" => $dto->nom,
                "description" => $dto->description,
                "prix" => $dto->prix,
                "stock" => $dto->stock,
                "image" => $dto->image,
                "category_id" => $dto->category_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Produit modifié',
                'data' => $product
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function delete(string $id)
    {
        try {

            $product = $this->productRespository->find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Prouit introuvable',
                ]);
            }

            //Suppression de la categorie
            $this->productRespository->delete($product);

            return response()->json([
                'success' => true,
                'message' => 'Produit supprimé',
                'data' => []
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }
}
