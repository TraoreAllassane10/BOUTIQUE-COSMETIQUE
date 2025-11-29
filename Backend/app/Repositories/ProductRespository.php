<?php

namespace App\Repositories;

use App\Models\Product;
use App\Http\Resources\ProductRessource;

class ProductRespository
{
    public function all()
    {
        return ProductRessource::collection(Product::latest()->get());
    }

    public function find(string $id)
    {
        return Product::find($id);
    }

    public function create($data)
    {
        return Product::create($data);
    }

    public function update(Product $product, $data)
    {
        $product->nom = $data['nom'];
        $product->description = $data['description'];
        $product->prix = $data['prix'];
        $product->stock = $data['stock'];
        $product->image = $data['image'];
        $product->category_id = $data['category_id'];

        $product->save();
        return $product;
    }

    public function delete(Product $product)
    {
        return $product->delete();
    }
}
