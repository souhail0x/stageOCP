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
            
            $table->float('longeur');
            $table->float('largeur');
            $table->float('surface');
            $table->float('volume');
            $table->float('ammonix');
            $table->float('dosage');
            $table->float('tovex');
            $table->float('m_f');
            $table->float('ligneDeTir');
            $table->float('aei');
            $table->float('chargeInstantanee');
            $table->float('repartition');
            $table->float('r_prevu');
            $table->float('profondeur');
            $table->float('detonateur');
            $table->float('r17');
            $table->float('r25');
            $table->float('r42');
            $table->float('r65');
            $table->float('r100');
            $table->float('prix_aei');
            $table->float('prix_detonateur');
            $table->float('prix_raccord');
            $table->float('prix_ammonix');
            $table->float('prix_lingeTir')->nullable();
            $table->float('prix_tovex');
            $table->text('observation')->nullable();
            $table->integer('cmd_id');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       
        Schema::dropIfExists('resultat_commandes');
    }
};
