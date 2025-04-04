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
        Schema::create('evenement_categories', function (Blueprint $table) {
            $table->foreignId('id_evenement')->constrained('evenements', 'id_evenement')->onDelete('cascade');
            $table->foreignId('id_categorie')->constrained('categories', 'id_categorie')->onDelete('cascade');
            $table->primary(['id_evenement', 'id_categorie']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
