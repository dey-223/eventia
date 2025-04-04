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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id('id_inscription');
            $table->foreignId('id_evenement')->constrained('evenements', 'id_evenement')->onDelete('cascade');
            $table->foreignId('id_user')->constrained('users', 'id_user')->onDelete('cascade');
            $table->timestamp('date_inscription')->useCurrent();
            $table->enum('statut', ['confirmé', 'en attente', 'annulé']);
            $table->text('commentaire')->nullable();
            $table->unique(['id_evenement', 'id_user']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
