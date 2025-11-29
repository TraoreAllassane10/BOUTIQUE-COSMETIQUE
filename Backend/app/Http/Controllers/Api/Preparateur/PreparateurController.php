<?php

namespace App\Http\Controllers\Api\Preparateur;

use App\Http\Controllers\Controller;
use App\Services\Preparateur\PreparateurServices;
use Illuminate\Http\Request;

class PreparateurController extends Controller
{

    public function __construct(
        public PreparateurServices $preparateurServices
    )
    {}

    public function commandeATraitee()
    {
        return $this->preparateurServices->commandeATraitee();
    }
}
