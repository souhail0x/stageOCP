<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Sautage;
use App\Models\Resultat_commandes;

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
        'espacement',
    ];

    public function sautage()
    {
        return $this->hasOne(Sautage::class, 'numero_execution', 'Num_Commande');
    }

    public function resultat()
    {
        return $this->hasOne(Resultat_commandes::class, 'id', 'Num_Commande');
    }
}
