<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id('id_inscription');
            $table->foreignId('id_event')
                  ->constrained('events', 'id_event')
                  ->onDelete('cascade');

            $table->timestamp('date_inscription')->useCurrent();
            $table->enum('statut', ['confirmé', 'en attente', 'annulé']);
            $table->text('commentaire')->nullable();

            $table->string('nom', 192);
            $table->string('email', 192);
            $table->string('telephone', 192)->nullable();
            $table->string('entreprise', 192)->nullable();

            $table->timestamps();

            $table->unique(['id_event', 'email'], 'unique_event_email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
