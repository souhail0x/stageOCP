<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sautage extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'numero_execution',
        'numero_commande',
        'heure_arrivée_camions',
        'BLF_Artifices_Ligne',
        'effictif',
        'BLF_Ammonix',
        'bs_tovex_artifices',
        'son',
        'BLF_Tovex',
        'type',
        'frequence',
        'heure_tir',
        'bs_ammonix',
        'vitesse',
        'observation',
    ];
}

