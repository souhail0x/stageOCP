<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSautagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sautages', function (Blueprint $table) {
            $table->date('date');
            $table->integer('numero_execution');
            $table->integer('numero_commande');
            $table->string('BLF_Ammonix');
            $table->string('BLF_Tovex');
            $table->string('BLF_Artifices_Ligne');
            $table->string('heure_arrivée_camions');
            $table->string('heure_tir');
            $table->string('effictif');
            $table->string('bs_tovex_artifices');
            $table->string('son');
            $table->string('type');
            $table->integer('frequence');
            $table->string('bs_ammonix');
            $table->integer('vitesse');
            $table->text('observation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sautages');
    }
}
