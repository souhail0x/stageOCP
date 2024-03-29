<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoutsTable extends Migration
{
    public function up()
    {
        Schema::create('couts', function (Blueprint $table) {
            $table->id();
            $table->date('dateCommande')->nullable();
            $table->integer('id_cout');
            $table->integer('ammonix');
            $table->integer('tovex');
            $table->integer('detos500ms');
            $table->integer('raccord17');
            $table->integer('raccord25');
            $table->integer('raccord42');
            $table->integer('raccord65');
            $table->integer('raccord100');
            $table->integer('lign');
            $table->integer('aei');
            $table->string('etatCout');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('couts');
    }


};
