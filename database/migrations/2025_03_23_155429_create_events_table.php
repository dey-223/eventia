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
            $table->id('id_event');
            $table->string('title');
            $table->text('description');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date');
            $table->string('location');
            $table->string('image')->nullable();
            $table->string('event_type');
            $table->enum('statut', ['planifié', 'en cours', 'terminé', 'annulé']);
            $table->integer('max_participants')->nullable();
            $table->foreignId('id_organisateur')->nullable()->constrained('users', 'id_user')->onDelete('set null');
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
