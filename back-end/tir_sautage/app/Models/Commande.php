<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'Num_Commande',
        'panneau',
        'tranche',
        'niveau',
        'mode_tir',
        'foration',
        'nombre_trous',
        'nombre_ranges',
        'trous_range',
        'maille_banquette',
        'decappage',
        'profondeur',
        'zone_tir',
        'mode_charge',
        'dosage_prevu',
        'schema_tir',
        // Ajoutez ici les autres colonnes du modèle
    ];
}
