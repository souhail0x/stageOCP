<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Commande;
use App\Models\Sautage;
use App\Models\Resultat_commande;

class ArchiveController extends Controller
{
    public function index()
    {
        // Récupérer les données groupées par ID
        $data = Commande::with('sautage', 'resultat')->get();

        // Organiser les données par ID
        $groupedData = [];
        foreach ($data as $item) {
            $id = $item->id;
            if (!isset($groupedData[$id])) {
                $groupedData[$id] = [];
            }
            $groupedData[$id][] = $item;
        }

        return response()->json($groupedData);
    }
}
