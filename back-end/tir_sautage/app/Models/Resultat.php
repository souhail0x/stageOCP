<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resultat extends Model
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
        'm.f',
        'ligneDeTir',
        'aei',
        'chargeInstantanee',
        'repartition',
        'r.prevu',
        'profondeur',
        'detonateur',
        'r17',
        'r25',
        'r42',
        'r65',
        'r100',
        'prix-aei',
        'prix-detonateur',
        'prix-raccord',
        'prix-ammonix',
        'prix-lingeTir',
        'prix-tovex',
    ];
    
}
