<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SautageGestionController;
use App\Http\Controllers\CoutController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\EtatChantierController;
use App\Http\Middleware\CheckTokenAbilities;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//sautage
Route::get('/sautage', [SautageGestionController::class, 'index']);
Route::post('/sautage', [SautageGestionController::class, 'store']);

//commande
Route::get('/commandes', [CommandeController::class, 'index']);
Route::post('/commandes', [CommandeController::class, 'store']);
Route::get('/commandes/{id}', [CommandeController::class, 'show']);
Route::put('/commandes/{id}', [CommandeController::class, 'update']);
Route::delete('/commandes/{id}', [CommandeController::class, 'destroy']);

//cout
Route::get('/couts', [CoutController::class, 'index']); // Liste de tous les couts
Route::post('/couts', [CoutController::class, 'store']); // Créer un nouveau cout
Route::get('/couts/{cout}', [CoutController::class, 'show']); // Afficher un cout spécifique
Route::put('/couts/{cout}', [CoutController::class, 'update']); // Mettre à jour un cout spécifique
Route::delete('/couts/{cout}', [CoutController::class, 'destroy']); // Supprimer un cout spécifique

//stock
Route::get('/gestion-stocks', [StockController::class, 'index']); // Afficher tous les stocks
Route::post('/gestion-stocks', [StockController::class, 'store']); // Ajouter un nouveau stock
Route::get('/gestion-stocks/{id}', [StockController::class, 'show']); // Afficher un stock par son ID
Route::put('/gestion-stocks/{id}', [StockController::class, 'update']); // Mettre à jour un stock par son ID
Route::delete('/gestion-stocks/{id}', [StockController::class, 'destroy']); // Supprimer un stock par son ID

//etat de chantie 
Route::get('/etat-chantiers', [EtatChantierController::class, 'index']);
Route::post('/etat-chantiers', [EtatChantierController::class, 'store']);
Route::put('/etat-chantiers/{id}', [EtatChantierController::class, 'update']);
Route::delete('/etat-chantiers/{id}', [EtatChantierController::class, 'destroy']);

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware(['auth:sanctum,ability:admin-rules'])->group(function () {
    Route::get('/users', [UserManagementController::class, 'index']);
    
    Route::get('/users/show/{user}', [UserManagementController::class, 'show']);
    Route::put('/users/update/{user}', [UserManagementController::class, 'update']);
    Route::delete('/users/delete/{user}', [UserManagementController::class, 'destroy']);
    
});
Route::middleware(['auth:sanctum'])->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
});
