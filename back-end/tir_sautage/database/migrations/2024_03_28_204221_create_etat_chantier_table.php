<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtatChantierTable extends Migration
{
    public function up()
    {
        Schema::create('etat_chantiers', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('machine');
            $table->integer('avance_foration');
            $table->integer('avance_decapage');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('etat_chantiers');
    }
}
