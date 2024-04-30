<?php

namespace App\Http\Controllers;

use App\Models\Resultat;
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
        'm.f' => 'required|string',
        'ligneDeTir' => 'required|string',
        'aei' => 'required|string',
        'chargeInstantanee' => 'required|string',
        'repartition' => 'required|string',
        'r.prevu' => 'required|string',
        'profondeur' => 'required|numeric',
        'detonateur' => 'required|string',
        'r17' => 'required|string',
        'r25' => 'required|string',
        'r42' => 'required|string',
        'r65' => 'required|string',
        'r100' => 'required|string',
        'prix-aei' => 'required|string',
        'prix-detonateur' => 'required|string',
        'prix-raccord' => 'required|string',
        'prix-ammonix' => 'required|string',
        'prix-lingeTir' => 'required|string',
        'prix-tovex' => 'required|string',
    ]);

    $commande = Resultat::create($validatedData);

    return response()->json($commande, 201);
}

}
