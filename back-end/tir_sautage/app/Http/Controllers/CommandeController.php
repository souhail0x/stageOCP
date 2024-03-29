<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;

class CommandeController extends Controller
{
    public function index()
    {
        $commandes = Commande::all();
        return response()->json($commandes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required|date',
            'Num_Commande' => 'required|string',
            'panneau' => 'required|string',
            'tranche' => 'required|string',
            'niveau' => 'required|string',
            'mode_tir' => 'required|string',
            'foration' => 'required|string',
            'nombre_trous' => 'required|integer',
            'nombre_ranges' => 'required|integer',
            'trous_range' => 'required|integer',
            'maille_banquette' => 'required|integer',
            'decappage' => 'required|string',
            'profondeur' => 'required|numeric',
            'zone_tir' => 'required|string',
            'mode_charge' => 'required|string',
            'dosage_prevu' => 'required|string',
            'schema_tir' => 'required|string',
            // Ajoutez ici les validations pour les autres champs
        ]);

        $commande = Commande::create($validatedData);

        return response()->json($commande, 201);
    }

    public function show($id)
    {
        $commande = Commande::findOrFail($id);
        return response()->json($commande);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'date' => 'required|date',
            'Num_Commande' => 'required|string',
            'panneau' => 'required|string',
            'tranche' => 'required|string',
            'niveau' => 'required|string',
            'mode_tir' => 'required|string',
            'foration' => 'required|string',
            'nombre_trous' => 'required|integer',
            'nombre_ranges' => 'required|integer',
            'trous_range' => 'required|integer',
            'maille_banquette' => 'required|integer',
            'decappage' => 'required|string',
            'profondeur' => 'required|numeric',
            'zone_tir' => 'required|string',
            'mode_charge' => 'required|string',
            'dosage_prevu' => 'required|string',
            'schema_tir' => 'required|string',
            // Ajoutez ici les validations pour les autres champs
        ]);

        $commande = Commande::findOrFail($id);
        $commande->update($validatedData);

        return response()->json($commande, 200);
    }

    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();

        return response()->json(null, 204);
    }
}
