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
    Schema::table('inscriptions', function (Blueprint $table) {
        $table->string('nom', 192)->after('commentaire');
        $table->string('email', 192)->after('nom');
        $table->string('telephone', 192)->nullable()->after('email');
        $table->string('entreprise', 192)->nullable()->after('telephone');

        // Ajout de la contrainte d’unicité propre
        $table->unique(['id_event', 'email'], 'unique_event_email');
    });
}

public function down(): void
{
    Schema::table('inscriptions', function (Blueprint $table) {
        $table->dropUnique('unique_event_email');
        $table->dropColumn(['nom', 'email', 'telephone', 'entreprise']);
    });
}

};
