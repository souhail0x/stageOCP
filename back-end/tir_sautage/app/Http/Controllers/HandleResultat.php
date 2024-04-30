<?php

namespace App\Http\Controllers;

use App\Models\Resultat;
use App\Models\Resultat_commandes;
use App\Models\Resultats_commandes;
use Illuminate\Http\Request;

class HandleResultat extends Controller
{
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'id' => 'required|integer',
        'longeur' => 'required|numeric',
        'largeur' => 'required|numeric',
        'surface' => 'required|numeric',
        'volume' => 'required|numeric',
        'ammonix' => 'required|numeric',
        'dosage' => 'required|numeric',
        'tovex' => 'required|numeric',
        'm_f' => 'required|numeric',
        'ligneDeTir' => 'required|numeric',
        'aei' => 'required|numeric',
        'chargeInstantanee' => 'required|numeric',
        'repartition' => 'required|numeric',
        'r_prevu' => 'required|numeric',
        'profondeur' => 'required|numeric',
        'detonateur' => 'required|numeric',
        'r17' => 'required|numeric',
        'r25' => 'required|numeric',
        'r42' => 'required|numeric',
        'r65' => 'required|numeric',
        'r100' => 'required|numeric',
        'prix_aei' => 'required|numeric',
        'prix_detonateur' => 'required|numeric',
        'prix_raccord' => 'required|numeric',
        'prix_ammonix' => 'required|numeric',
        'prix_lingeTir' => 'numeric',
        'prix_tovex' => 'required|numeric',
    ]);

    $commande = Resultat_commandes::create($validatedData);

    return response()->json($commande, 201);
}

}
