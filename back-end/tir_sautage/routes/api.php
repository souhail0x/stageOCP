<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SautageGestionController;
use App\Http\Controllers\CoutController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\EtatChantierController;









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

// Corrected controller class name to 'CommandeController'



//sautage
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

