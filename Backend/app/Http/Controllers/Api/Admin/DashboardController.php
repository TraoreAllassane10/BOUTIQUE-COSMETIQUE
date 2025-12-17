<?php

namespace App\Http\Controllers\Api\Admin;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use function Symfony\Component\Clock\now;

class DashboardController extends Controller
{
    public function index()
    {
        $revenusJournalier = Commande::where("date", Carbon::today())->sum("montant");
        $totalRevenus = Commande::all()->sum("montant");
        $nombreCommande = Commande::count();
        $nombreClient = User::role("client")->count();
        $dernieresCommandes = Commande::latest()->limit(5)->get();
        $derniersClients = User::role('client')->limit(5)->get();

        // Preparation des données de la Chart
        $commandes = Commande::select(
            DB::raw("MONTH(date) as mois"),
            DB::raw("SUM(montant) as total")
        )->whereYear("date", now())
            ->groupBy(DB::raw("MONTH(date)"))
            ->orderBy(DB::raw("MONTH(date)"))
            ->get();

        $moisLabels = [
            1 => 'Jan',
            2 => 'Fév',
            3 => 'Mar',
            4 => 'Avr',
            5 => 'Mai',
            6 => 'Juin',
            7 => 'Juil',
            8 => 'Août',
            9 => 'Sep',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Déc',
        ];

        $chartData = [];
        foreach($moisLabels as $numero => $label){
            $commandesMois = $commandes->firstWhere("mois", $numero);

             $chartData[] = [
                "mois" => $label,
                "total" => $commandesMois ? (int) $commandesMois->total : 0
             ];
        }

        return response()->json([
            "revenusJournalier" => $revenusJournalier,
            "totalRevenus" => $totalRevenus,
            "nombreCommande" => $nombreCommande,
            "nombreClient" => $nombreClient,
            "dernieresCommandes" => $dernieresCommandes,
            "derniersClients" => $derniersClients,
            "chartData" => $chartData
        ]);
    }
}
