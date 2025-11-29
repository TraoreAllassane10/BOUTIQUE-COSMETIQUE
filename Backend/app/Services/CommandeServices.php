<?php

namespace App\Services;

use Exception;
use App\Models\Commande;
use App\Models\User;
use App\Notifications\EditCommandeStatusByAdminNotification;

class CommandeServices
{

    public function all()
    {
        try {

            $commandes = Commande::with("user")->get();

            return response()->json([
                'success' => true,
                'message' => 'La liste des toutes les commandes',
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

    public function updateStatus($request, $commande)
    {
        try {

            $commande = Commande::find($commande);

            if (!$commande) {
                return response()->json([
                    'success' => false,
                    'message' => 'Commande introuvable',
                ]);
            }

            //Modification de statut d'une commande
            $commande->statut = $request->statut;

            $commande->save();

            $user = User::find($commande->user_id);
            $user->notify(new EditCommandeStatusByAdminNotification($commande));

            return response()->json([
                'success' => true,
                'message' => 'Le statut de la commande a été mis à jour',
                'data' => $commande
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function delete($commande)
    {
        try {
            $commande = Commande::find($commande);

            if (!$commande) {
                return response()->json([
                    'success' => false,
                    'message' => 'Commande introuvable',
                ]);
            }

            $commande->delete();

            return response()->json([
                'success' => true,
                'message' => 'Commande supprimée',
                'data' => []
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
