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
        'ammonix',
        'tovex',
        'detos_500ms',
        'raccord_17',
        'raccord_25',
        'raccord_42',
        'raccord_65',
        'raccord_100',
        'lign',
        'aei',
        'etat_stock',
    ];
}