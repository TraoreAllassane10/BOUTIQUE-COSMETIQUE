<?php

namespace App\Http\Controllers\Api\Admin;

use App\DTO\CreateCategoryDTO;
use App\DTO\UpdateCategoryDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategorieUpdateRequest;
use App\Http\Requests\Category\CategoryStoreRequest;
use App\Http\Resources\CategoryRessource;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(
        public CategoryService $categoryService
    ) {}

    public function index(Request $request)
    {
        $nomCategorie = $request->query("nom");

        $categories = Category::when($nomCategorie, function ($query) use ($nomCategorie) {
            $query->where("nom", "like", "%{$nomCategorie}%");
        })->latest()->get();

        return CategoryRessource::collection($categories);
    }

    public function show(string $id)
    {
        return $this->categoryService->find($id);
    }

    public function store(CategoryStoreRequest $request)
    {
        // Recuperation de la donnée vaidée
        $data = $request->validated();

        // Creation d'un objet DTO
        $dto = new CreateCategoryDTO($data["nom"]);

        return $this->categoryService->create($dto);
    }

    public function update(CategorieUpdateRequest $request, string $id)
    {
        // Recuperation de la donnée vaidée
        $data = $request->validated();

        // Creation d'un objet DTO
        $dto = new UpdateCategoryDTO($data["nom"]);

        return $this->categoryService->update($id, $dto);
    }

    public function delete(string $id)
    {
        return $this->categoryService->delete($id);
    }
}
