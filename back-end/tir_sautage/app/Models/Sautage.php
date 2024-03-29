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
        'h_arrivee_camions',
        'blf_artifices',
        'effictif',
        'blf_ammonix',
        'bs_tovex_artifices',
        'son',
        'blf_tovex',
        'type',
        'frequence',
        'heure_tir',
        'bs_ammonix',
        'vitesse',
        'observation',
    ];
}
