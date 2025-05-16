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
        Schema::create('billets', function (Blueprint $table) {
           
                $table->id('id_billet');
                $table->foreignId('id_inscription')->constrained('inscriptions', 'id_inscription')->onDelete('cascade');
                $table->string('type_billet', 50);
                $table->decimal('prix', 10, 2)->nullable();
                $table->string('code_qr', 255)->nullable();
                $table->timestamp('date_emission')->useCurrent();
                $table->boolean('validite')->default(true);
                // $table->foreignId('id_evenement')->constrained('events', 'id_evenement')->onDelete('cascade');
                // $table->foreignId('id_user')->constrained('users', 'id_user')->onDelete('cascade');

                $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billets');
    }
};
