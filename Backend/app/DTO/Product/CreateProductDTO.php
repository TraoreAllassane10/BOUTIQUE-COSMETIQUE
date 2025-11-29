<?php

namespace App\DTO\Product;

class CreateProductDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public string $nom,
        public string $description,
        public int $prix,
        public int $stock,
        public string $image,
        public int $category_id
    ) {}
}
