<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('Num_Commande');
            $table->string('panneau');
            $table->string('tranche');
            $table->string('niveau');
            $table->string('mode_tir');
            $table->string('foration');
            $table->integer('nombre_trous');
            $table->integer('nombre_ranges');
            $table->integer('trous_range');
            $table->integer('maille_banquette');
            $table->string('decappage');
            $table->float('profondeur');
            $table->string('zone_tir');
            $table->string('mode_charge');
            $table->string('dosage_prevu');
            $table->string('schema_tir');
            // Ajoutez d'autres colonnes ici selon vos besoins
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}
