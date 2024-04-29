<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sautage; // Importer le modèle Sautage

class SautageGestionController extends Controller
{
    public function index(){
        $sautages = Sautage::all();
        return response()->json($sautages);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Valider les données entrantes
        $validatedData = $request->validate([
            'date' => 'required|date',
            'numero_execution' => 'required|unique:sautages|numeric',
            'numero_commande' => 'required|numeric',
            'h_arrivee_camions' => 'required',
            'blf_artifices' => 'required',
            'effictif' => 'required',
            'blf_ammonix' => 'required',
            'bs_tovex_artifices' => 'required',
            'son' => 'required',
            'blf_tovex' => 'required',
            'type' => 'required',
            'frequence' => 'required|numeric',
            'heure_tir' => 'required',
            'bs_ammonix' => 'required',
            'vitesse' => 'required|numeric',
            'observation' => 'required',
        ]);

        // Créer une nouvelle instance de Sautage et la sauvegarder
        $sautage = Sautage::create($validatedData);

        // Retourner une réponse JSON indiquant le succès
        return response()->json(['message' => 'Sautage created successfully', 'data' => $sautage], 201);
    }

    public function update(Request $request, $id)
    {
        $sautage = Sautage::findOrFail($id);

        $validatedData = $request->validate([
            'date' => 'required|date',
            'numero_execution' => 'required|numeric|unique:sautages,numero_execution,'.$id,
            'numero_commande' => 'required|numeric',
            'h_arrivee_camions' => 'required',
            'blf_artifices' => 'required',
            'effictif' => 'required',
            'blf_ammonix' => 'required',
            'bs_tovex_artifices' => 'required',
            'son' => 'required',
            'blf_tovex' => 'required',
            'type' => 'required',
            'frequence' => 'required|numeric',
            'heure_tir' => 'required',
            'bs_ammonix' => 'required',
            'vitesse' => 'required|numeric',
            'observation' => 'required',
        ]);

        $sautage->update($validatedData);

        return response()->json(['message' => 'Sautage updated successfully', 'data' => $sautage], 200);
    }

    public function destroy($id)
    {
        $sautage = Sautage::findOrFail($id);
        $sautage->delete();

        return response()->json(['message' => 'Sautage deleted successfully'], 200);
    }
}
