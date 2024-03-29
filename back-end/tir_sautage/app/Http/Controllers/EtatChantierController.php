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
        $etatChantier->update($request->all());
        return $etatChantier;
    }

    public function destroy($id)
    {
        return EtatChantier::destroy($id);
    }
}
