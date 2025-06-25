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
        $table->string('nom');
        $table->string('email');
        $table->string('telephone')->nullable();
        $table->string('entreprise')->nullable();
    });
}

public function down(): void
{
    Schema::table('inscriptions', function (Blueprint $table) {
        $table->dropColumn(['nom', 'email', 'telephone', 'entreprise']);
    });
}

};
