<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cout extends Model
{
    use HasFactory;

    protected $fillable = [
        'dateCommande',
        'Num_Cout',
        'cout_ammonix',
        'cout_tovex',
        'cout_detonateur_500',
        'cout_detonateur_450',
        'cout_raccord_17',
        'cout_raccord_25',
        'cout_raccord_42',
        'cout_raccord_65',
        'cout_raccord_100',
        'ligne_tir',
        'cout_aei',
        'etat_cout',
    ];
}

