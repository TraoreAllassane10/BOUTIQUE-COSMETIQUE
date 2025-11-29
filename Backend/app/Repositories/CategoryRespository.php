<?php

namespace App\Repositories;

use App\Models\Category;
use App\Http\Resources\CategoryRessource;

class CategoryRespository
{
    
    public function all()
    {
        return CategoryRessource::collection(Category::latest()->get());
    }

    public function find(string $id)
    {
        return Category::find($id);
    }

    public function create(array $data)
    {
        return Category::create($data);
    }

    public function update(Category $category, array $data)
    {   
        $category->nom = $data['nom'];
        $category->save();
        return $category;
    }

    public function delete(Category $category)
    {
        return $category->delete();
    }
}
