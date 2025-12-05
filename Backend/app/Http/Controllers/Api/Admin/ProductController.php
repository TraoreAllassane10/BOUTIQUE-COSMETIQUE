<?php

namespace App\Http\Controllers\Api\Admin;

use App\DTO\Product\CreateProductDTO;
use App\DTO\Product\UpdateProductDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductStoreRequest;
use App\Http\Resources\ProductRessource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        public ProductService $productService
    ) {}

    public function index(Request $request)
    {
        // Recuperation de nom de produit à rechercher
        $nomProduit = $request->query("nom");
        $categorie = $request->query("categorie");

        $products = Product::when($nomProduit, function ($query) use ($nomProduit, $categorie) {
            $query->where('nom', 'like', "%{$nomProduit}%");
        })
            ->when($categorie, function ($query) use ($categorie) {
                $query->where("category_id", $categorie);
            })->latest()->get();


        return ProductRessource::collection($products);
    }

    public function show(string $id)
    {
        return $this->productService->find($id);
    }

    public function store(ProductStoreRequest $request)
    {
        // Recuperation de la donnée validée
        $data = $request->validated();

        //nom du fichier image
        $nomFichier = time() . '.' . $request->image->extension();

        // Stockage de l'image dans le dossier storage
        $path = $request->file('image')->storeAs(
            'products',
            $nomFichier,
            'public'
        );

        // Création d'un objet DTO
        $dto = new CreateProductDTO($data['nom'], $data['description'], $data['prix'], $data['stock'], $path, $data['category_id']);

        return $this->productService->create($dto);
    }

    public function update(ProductStoreRequest $request, string $id)
    {
        $data = $request->validated();

        // Récupérer le produit existant
        $product = Product::find($id);

        // Préserver l'image actuelle par défaut
        $imagePath = $product->image;

        // Vérifier SI une nouvelle image est envoyée
        if ($request->hasFile('image')) {
            $nomFichier = time() . '.' . $request->image->extension();

            $imagePath = $request->file('image')->storeAs(
                'products',
                $nomFichier,
                'public'
            );
        }

        $dto = new UpdateProductDTO(
            $data['nom'],
            $data['description'],
            (int) $data['prix'],
            (int) $data['stock'],
            $imagePath,
            (int) $data['category_id']
        );

        return $this->productService->update($dto, $id);
    }

    public function delete(string $id)
    {
        return $this->productService->delete($id);
    }
}
