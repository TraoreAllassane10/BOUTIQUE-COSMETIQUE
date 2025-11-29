<?php

use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\CommandeManageController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Client\CommandeClientController;
use App\Http\Controllers\Api\Client\ProductClientController;
use App\Http\Controllers\Api\Preparateur\PreparateurController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');

Route::controller(ProductClientController::class)->group(function () {
    Route::get('/products', 'index')->name('products');
    Route::get('/products/{product}', 'show')->name('products.show');
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/commandes/process', [CommandeClientController::class, 'process'])->name("commandes.process");
    Route::get('/commandes/historique', [CommandeClientController::class, 'historique'])->name("commandes.historique");

    Route::middleware("manager")->group(function () {
        // Routes de gestion des categories
        Route::get('/admin/categories', [CategoryController::class, "index"])->name('admin.categories');
        Route::get('/admin/categories/{category}', [CategoryController::class, "show"])->name('admin.categories.show');
        Route::post('/admin/categories', [CategoryController::class, "store"])->name('admin.categories.store');
        Route::put('/admin/categories/{category}', [CategoryController::class, "update"])->name('admin.categories.update');
        Route::delete('/admin/categories/{category}', [CategoryController::class, "delete"])->name('admin.categories.delete');

        //Routes de gestions des Produits
        Route::controller(ProductController::class)->group(function () {
            Route::get('/admin/products', 'index')->name('admin.products');
            Route::get('/admin/products/{product}', 'show')->name('admin.products.show');
            Route::post('/admin/products', 'store')->name('admin.products.store');
            Route::put('/admin/products/{product}',  "update")->name('admin.products.update');
            Route::delete('/admin/products/{product}', "delete")->name('admin.products.delete');
        });

        //Routes de gestion des commandes
        Route::controller(CommandeManageController::class)->group(function () {
            Route::get('/admin/commandes', 'index')->name('commandes');
            Route::put('/admin/commandes/{commande}/status', 'updateStatus')->name('commandes.updateStatus');
            Route::delete('/admin/commandes/{commande}', 'delete')->name('commandes.delete');
        });
    });

    // Visualisation des commandes à traitée (en cours) par les admins et les preparateurs
    Route::middleware('preparateur')->group(function () {
        Route::get("/preparateurs", [PreparateurController::class, "commandeATraitee"])->name('preparateur.commande');
    });


    // Route::post('/logout', [UserController::class, 'logout'])->name('logout');
});
