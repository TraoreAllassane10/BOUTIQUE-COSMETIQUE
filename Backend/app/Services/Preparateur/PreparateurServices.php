<?php

namespace App\Services\Preparateur;

use Exception;
use App\Models\Commande;

class PreparateurServices
{
    
    public function commandeATraitee()
    {
        try {

            $commandes = Commande::where('statut', 'en cours')->get();

            return response()->json([
                'success' => true,
                'message' => 'Les commandes a traitée',
                'data' => $commandes
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
