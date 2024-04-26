<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoutsTable extends Migration
{
    public function up()
    {
        Schema::create('couts', function (Blueprint $table) {
            $table->date('dateCommande')->nullable();
            $table->string('Num_Cout');
            $table->integer('cout_ammonix');
            $table->integer('cout_aei');
            $table->integer('cout_raccord_17');
            $table->integer('cout_raccord_25');
            $table->integer('cout_raccord_42');
            $table->integer('cout_raccord_65');
            $table->integer('cout_raccord_100');
            $table->integer('cout_detonateur_450');
            $table->integer('cout_detonateur_500');
            $table->integer('cout_tovex');
            $table->integer('ligne_tir');
            $table->text('etat_cout');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('couts');
    }
};
