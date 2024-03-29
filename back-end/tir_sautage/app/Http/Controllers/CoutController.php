<?php

namespace App\Http\Controllers;

use App\Models\Cout;
use Illuminate\Http\Request;

class CoutController extends Controller
{
    public function index()
    {
        return Cout::all();
    }

    public function store(Request $request)
    {
        return Cout::create($request->all());
    }

    public function show(Cout $cout)
    {
        return $cout;
    }

    public function update(Request $request, Cout $cout)
    {
        $cout->update($request->all());
        return $cout;
    }

    public function destroy(Cout $cout)
    {
        $cout->delete();
        return response()->json(null, 204);
    }
}
