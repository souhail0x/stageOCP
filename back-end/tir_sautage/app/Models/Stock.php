<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $table='stock';
    protected $fillable = [
        'date_commande',
        'Num_Stock',
        'ammonix',
        'tovex',
        'detonateur_500',
        'detonateur_450',
        'raccord_17',
        'raccord_25',
        'raccord_42',
        'raccord_65',
        'raccord_100',
        'ligne_tir',
        'aei',
        'etat_stock',
    ];
}
