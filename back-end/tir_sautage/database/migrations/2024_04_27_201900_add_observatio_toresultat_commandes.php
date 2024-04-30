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
        Schema::table('resultat_commandes', function (Blueprint $table) {
            
            $table->string('longeur');
            $table->string('largeur');
            $table->string('surface');
            $table->string('volume');
            $table->string('ammonix');
            $table->string('dosage');
            $table->string('tovex');
            $table->string('m_f');
            $table->string('ligneDeTir');
            $table->string('aei');
            $table->string('chargeInstantanee');
            $table->string('repartition');
            $table->string('r_prevu');
            $table->string('profondeur');
            $table->string('detonateur');
            $table->string('r17');
            $table->string('r25');
            $table->string('r42');
            $table->string('r65');
            $table->string('r100');
            $table->string('prix_aei');
            $table->string('prix_detonateur');
            $table->string('prix_raccord');
            $table->string('prix_ammonix');
            $table->string('prix_lingeTir');
            $table->string('prix_tovex');
            $table->text('observation')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resultat_commandes', function (Blueprint $table) {
            $table->dropForeign(['commande_id']);
        });
        Schema::dropIfExists('resultat_commandes');
    }
};
