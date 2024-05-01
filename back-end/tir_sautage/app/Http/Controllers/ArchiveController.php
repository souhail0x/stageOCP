<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\Sautage;
use App\Models\Resultats_commandes;

class ArchiveController extends Controller
{
    public function index()
    {
        // Récupérer les données groupées par ID
        $data = DB::table('Commande')
            ->join('Sautage', 'Commande.Num_Commande', '=', 'Sautage.numero_execution')
            ->join('Resultats_commandes', 'Commande.Num_Commande', '=', 'Resultats_commandes.id')
            ->select('Commande.*', 'Sautage.*', 'Resultats_commandes.*')
            ->get();

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
