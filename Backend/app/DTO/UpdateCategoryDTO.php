<?php

namespace App\DTO;

class UpdateCategoryDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public string $nom
    ) {}
}
