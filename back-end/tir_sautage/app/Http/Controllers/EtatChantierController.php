<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EtatChantier;

class EtatChantierController extends Controller
{
    public function index()
    {
        return EtatChantier::all();
    }

    public function store(Request $request)
    {
        return EtatChantier::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $etatChantier = EtatChantier::findOrFail($id);
        
        $etatChantier->fill($request->only([
            'date',
            'machine',
            'avance_foration',
            'avance_decapage',
            'etat_machine',
        ]));
        
        $etatChantier->save();
        
        return $etatChantier;
    }


    public function destroy($id)
    {
        return EtatChantier::destroy($id);
    }
}
