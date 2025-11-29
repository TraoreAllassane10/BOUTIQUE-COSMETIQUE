<?php

namespace App\Services\Client;

use Exception;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductClientServices
{
    public function getProduts($request)
    {
        try {

            $query = Product::query();

            if ($request->nom) {
                $products = $query->where('nom', "like", "%" . $request->nom . "%")->get();
                $total = $products->count();
                $message = "Resulat : " . $total . ' produits trouvé(s)';
            } elseif ($request->prix) {
                $products = $query->where('prix', '<=', $request->prix)->get();
                $total = $products->count();
                $message = "Resulat : " . $total . ' produits trouvé(s)';
            } elseif ($request->category) {
                $products = $query->where('category_id', $request->category)->get();
                $total = $products->count();
                $message = "Resulat : " . $total . ' produits trouvé(s)';
            }

            $products = $query->get();
            $total = $products->count();
            $message = "Resulat : " . $total . ' produits trouvé(s)';

            return response()->json([
                "success" => true,
                "total" => $total,
                "message" => $message,
                "data" => $products
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur survenue au niveau du serveur',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getProduct(string $id)
    {
        try {

            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Produit introuvable'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Proudit trouvé',
                'data' => $product
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
