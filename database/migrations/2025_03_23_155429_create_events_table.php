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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('location');
            $table->string('image_url');
            $table->string('event_type');
            $table->enum('statut', ['planifié', 'en cours', 'terminé', 'annulé']);
            $table->integer('max_participants')->nullable();
            $table->foreignId('id_organisateur')->nullable()->constrained('utilisateurs', 'id_utilisateur')->onDelete('set null');
            $table->timestamp('date_creation')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
