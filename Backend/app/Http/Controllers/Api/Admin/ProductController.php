<?php

namespace App\Http\Controllers\Api\Admin;

use App\DTO\Product\CreateProductDTO;
use App\DTO\Product\UpdateProductDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductStoreRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        public ProductService $productService
    ) {}

    public function index(Request $request)
    {
        return $this->productService->all();
    }

    public function show(string $id)
    {
        return $this->productService->find($id);
    }

    public function store(ProductStoreRequest $request)
    {
        $data = $request->validated();

        // Création d'un objet DTO
        $dto = new CreateProductDTO($data['nom'], $data['description'], $data['prix'], $data['stock'], $data['image'], $data['category_id']);

        return $this->productService->create($dto);
    }

    public function update(ProductStoreRequest $request, string $id)
    {
        // Recuperation de la donnée vaidée
        $data = $request->validated();

        // Création d'un objet DTO
        $dto = new UpdateProductDTO($data['nom'], $data['description'], $data['prix'], $data['stock'], $data['image'], $data['category_id']);

        return $this->productService->update($dto, $id);
    }

    public function delete(string $id)
    {
        return $this->productService->delete($id);
    }
}
