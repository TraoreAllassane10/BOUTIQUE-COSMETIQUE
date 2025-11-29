<?php

namespace App\Services;

use App\DTO\CreateCategoryDTO;
use App\DTO\UpdateCategoryDTO;
use Exception;
use App\Repositories\CategoryRespository;
use App\Http\Requests\Category\CategoryStoreRequest;

class CategoryService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public CategoryRespository $categoryRespository
    ) {}

    public function all()
    {
        try {
            // Recuperation de toutes les categorie
            $categories = $this->categoryRespository->all();

            return response()->json([
                'success' => true,
                'message' => 'La liste des catégories',
                'data' => $categories
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
            $category = $this->categoryRespository->find($id);

            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Categorie introuvable',
                ]);
            }


            return response()->json([
                'success' => true,
                'message' => 'Catégorie trouvée',
                'data' => $category
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function create(CreateCategoryDTO $dto)
    {
        try {

            //Creation de la categorie
            $Category = $this->categoryRespository->create([
                "nom" => $dto->nom
            ]);

            // Erreur lors de l'insertion
            if (!$Category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur survenue lors de l\'insertion',
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Catégorie crée',
                'data' => $Category
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function update(string $id, UpdateCategoryDTO $dto)
    {
        try {

            $category = $this->categoryRespository->find($id);

            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Categorie introuvable',
                ]);
            }

            $categoryModifie = $this->categoryRespository->update($category, [
                "nom" => $dto->nom
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Catégorie modifiée',
                'data' => $categoryModifie
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

            $category = $this->categoryRespository->find($id);

            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Categorie introuvable',
                ]);
            }

            //Suppression de la categorie
            $this->categoryRespository->delete($category);

            return response()->json([
                'success' => true,
                'message' => 'Catégorie supprimée',
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
