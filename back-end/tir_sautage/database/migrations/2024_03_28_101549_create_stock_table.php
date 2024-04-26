<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock', function (Blueprint $table) {
            $table->date('date_commande');
            $table->string('Num_Stock');
            $table->integer('ammonix');
            $table->integer('aei');
            $table->integer('raccord_17');
            $table->integer('raccord_25');
            $table->integer('raccord_42');
            $table->integer('raccord_65');
            $table->integer('raccord_100');
            $table->integer('detonateur_450');
            $table->integer('detonateur_500');
            $table->integer('tovex');
            $table->integer('ligne_tir');
            $table->text('etat_stock');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock');
    }
};