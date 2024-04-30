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
        'longeur' => 'required|string',
        'largeur' => 'required|string',
        'surface' => 'required|string',
        'volume' => 'required|string',
        'ammonix' => 'required|string',
        'dosage' => 'required|string',
        'tovex' => 'required|string',
        'm_f' => 'required|string',
        'ligneDeTir' => 'required|string',
        'aei' => 'required|string',
        'chargeInstantanee' => 'required|string',
        'repartition' => 'required|string',
        'r_prevu' => 'required|string',
        'profondeur' => 'required|numeric',
        'detonateur' => 'required|string',
        'r17' => 'required|string',
        'r25' => 'required|string',
        'r42' => 'required|string',
        'r65' => 'required|string',
        'r100' => 'required|string',
        'prix_aei' => 'required|string',
        'prix_detonateur' => 'required|string',
        'prix_raccord' => 'required|string',
        'prix_ammonix' => 'required|string',
        'prix_lingeTir' => 'required|string',
        'prix_tovex' => 'required|string',
    ]);

    $commande = Resultat_commandes::create($validatedData);

    return response()->json($commande, 201);
}

}
