<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Supprime la contrainte d'unicité (id_event + id_user)
     */
    public function up(): void
    {
        Schema::table('inscriptions', function (Blueprint $table) {
            $table->dropUnique('inscriptions_id_event_id_user_unique');
        });
    }

    
    public function down(): void
    {
        Schema::table('inscriptions', function (Blueprint $table) {
            $table->unique(['id_event', 'id_user']);
        });
    }
};
