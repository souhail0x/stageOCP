<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtatChantier extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'machine',
        'avance_foration',
        'avance_decapage',
        'etat_cout',
    ];
}
