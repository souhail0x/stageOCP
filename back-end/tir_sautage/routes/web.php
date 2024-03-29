<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SautageGestionController;
use App\Http\Controllers\CommandeController;








/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/sautage', [SautageGestionController::class, 'store']);
Route::get('/commandes', [CommandeController::class, 'index']);
Route::post('/commandes', [CommandeController::class, 'store']);
Route::get('/commandes/{id}', [CommandeController::class, 'show']);
Route::put('/commandes/{id}', [CommandeController::class, 'update']);
Route::delete('/commandes/{id}', [CommandeController::class, 'destroy']);

