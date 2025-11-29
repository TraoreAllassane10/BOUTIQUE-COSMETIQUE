<?php

namespace App\Services\Client;

use Exception;
use Carbon\Carbon;
use App\Models\Commande;
use App\Notifications\CommandeClientRegisteredNotification;

class CommandeClientServices
{
    public function process($request)
    {
        try {

            $panier = $request->panier; // un tableau constitué des ID des produits à commander. Ex : [1, 2, 3]
            $montant = $request->montant;

            $commande = Commande::create([
                "date" => Carbon::now(),
                "montant" => $montant,
                "statut" => "en cours",
                "user_id" => $request->user()->id
            ]);

            foreach ($panier as $item) {
                $commande->produits()->attach($item, [
                    "quantite" => 1
                ]);
            }

            // Recuperation de l'utilisateur connecté
            $user = $request->user();

            //Envoi de notofication de la commande à l'utlisateur
            $user->notify(new CommandeClientRegisteredNotification($commande));

            if ($commande) {
                return response()->json([
                    "success" => true,
                    'message' => 'Commande créee',
                    'data' => $commande
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function historique($request)
    {
        try {
            $user = $request->user();

            $commandes = Commande::where('user_id', $user->id)->with('produits')->get();

            return response()->json([
                "success" => true,
                'message' => 'Liste de mes commandes',
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
