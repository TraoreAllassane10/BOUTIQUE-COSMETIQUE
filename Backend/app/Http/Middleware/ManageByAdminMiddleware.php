<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ManageByAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $permission = $request->user()->can(['manage produit']);

        if (!$permission)
        {
            return response()->json([
                "success" => false,
                "message" => "Vous n'etes pas autorisé à acceder à cette ressource"
            ]);
        }
       
        return $next($request);
    }
}
