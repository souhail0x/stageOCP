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
            $table->id();
            $table->date('date');
            $table->integer('numero_execution');
            $table->integer('numero_commande');
            $table->string('h_arrivee_camions');
            $table->string('blf_artifices');
            $table->string('effictif');
            $table->string('blf_ammonix');
            $table->string('bs_tovex_artifices');
            $table->string('son');
            $table->string('blf_tovex');
            $table->string('type');
            $table->integer('frequence');
            $table->string('heure_tir');
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
