<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreparateurMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //Cette variable nous permettra de verifier si l'utlisateur est un admin puisque c'est un admin qui 'manage produit"
        $permission = $request->user()->can(['manage produit']) || $request->user()->can(["view commande a traiter"]);

        // $permissonPreparateur = $request->user()->can(["view commande a traiter"]);

        if (!$permission) {
            return response()->json([
                "success" => false,
                "message" => "Vous n'etes pas autorisé à acceder à cette ressource"
            ]);
        }

        return $next($request);
    }
}
