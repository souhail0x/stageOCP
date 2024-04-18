<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->date('date');
            $table->string('Num_Commande');
            $table->string('panneau');
            $table->string('tranche');
            $table->string('niveau');
            $table->string('mode_tir');
            $table->integer('maille_E');
            $table->integer('maille_B');
            $table->float('Métrage foré');
            $table->integer('nombre_trous');
            $table->integer('nombre_ranges');
            $table->integer('trous_range');
            $table->float('profondeur');           
            $table->integer('longueur');
            $table->integer('surface');
            $table->integer('volume');
            $table->string('dosage_prévu');
            $table->string('dosage_réalisé');
            $table->string('zone_tir');
            $table->string('mode_charge');
            $table->string('machine_Foration');
            $table->string('machine_Decappage');
            $table->string('schema_tir');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}
