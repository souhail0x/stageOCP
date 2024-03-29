<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index()
    {
        $gestionStocks = Stock::all();
        return response()->json($gestionStocks);
    }
    

    public function store(Request $request)
    {
        $stock = Stock::create($request->all());
        return response()->json($stock, 201);
    }

    public function show($id)
    {
        $stock = Stock::findOrFail($id);
        return response()->json($stock);
    }

    public function update(Request $request, $id)
    {
        $stock = Stock::findOrFail($id);
        $stock->update($request->all());
        return response()->json($stock, 200);
    }

    public function destroy($id)
    {
        Stock::destroy($id);
        return response()->json(null, 204);
    }
}