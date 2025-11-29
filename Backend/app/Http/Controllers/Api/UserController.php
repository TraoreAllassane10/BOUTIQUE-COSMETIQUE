<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function register(UserRegisterRequest $request)
    {
        try {

            //Recuperer les données validées
            $data = $request->validated();

            //Enregistrement de l'user
            $user = User::create($data);

            //Assigner le role du client a l'utilistauer
            $user->assignRole('client');

            return response()->json([
                "success" => true,
                "message" => "Utilisateur crée",
                "data" => $user
            ], 201);

        }
         catch (Exception $e)
         {
           return response()->json([
            "success" => false,
            "message" => "une erreur est survenu au niveau du serveur",
            "error" => $e->getMessage()
           ]);
        }
    }

    public function login(UserLoginRequest $request) {

        try {
            //Recuperer les données validées
            $data = $request->validated();

            
            if (Auth::attempt($data))
            {
                //L'utilisateur connecté
                $user = Auth::user();

                //Creation de l'utilisateur connecté
                $token = $user->createToken($user->id)->plainTextToken;

                return response()->json([
                    'success' => true,
                    'message' => "Utilisateur connecté",
                    'token' => $token,
                    'data' => $user,

                ]);
            }
            else
            {
                return response()->json([
                    'success' => false,
                    'message' => "Vous n'avez pas de compte"
                ]);
            }

        }  catch (Exception $e)
         {
           return response()->json([
            "success" => false,
            "message" => "une erreur est survenu au niveau du serveur",
            "error" => $e->getMessage()
           ]);
        }
    }

    // public function logout(Request $request) {
        
    //     try {

    //         // Suppressuion du token de l'utilisateur conecté
    //         // $request->user()->currentAccessToken()->delete();

    //         return response()->json([
    //             "success" => true,
    //             "message" => "Utilisteur deconnecté",
    //         ]);

    //     }  catch (Exception $e)
    //      {
    //        return response()->json([
    //         "success" => false,
    //         "message" => "une erreur est survenu au niveau du serveur",
    //         "error" => $e->getMessage()
    //        ]);
    //     }
    // }
}
