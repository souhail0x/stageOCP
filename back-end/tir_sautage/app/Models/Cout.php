<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cout extends Model
{
    use HasFactory;

    protected $fillable = [
        'dateCommande',
        'id_cout',
        'ammonix',
        'tovex',
        'detos500ms',
        'raccord17',
        'raccord25',
        'raccord42',
        'raccord65',
        'raccord100',
        'lign',
        'aei',
        'etatCout',
    ];
}

