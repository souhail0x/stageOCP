<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resultat_commandes extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'longeur',
        'commande_id',
        'largeur',
        'surface',
        'volume',
        'ammonix',
        'dosage',
        'tovex',
        'm_f',
        'ligneDeTir',
        'aei',
        'chargeInstantanee',
        'repartition',
        'r_prevu',
        'profondeur',
        'detonateur',
        'r17',
        'r25',
        'r42',
        'r65',
        'r100',
        'prix_aei',
        'prix_detonateur',
        'prix_raccord',
        'prix_ammonix',
        'prix_lingeTir',
        'prix_tovex',
    ];

}
