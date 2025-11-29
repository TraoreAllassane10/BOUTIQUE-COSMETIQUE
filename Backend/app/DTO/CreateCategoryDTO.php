<?php

namespace App\DTO;

class CreateCategoryDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public string $nom
    ) {}
}
