<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('ranking_analysis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idStudent');
            $table->unsignedBigInteger('id_sala');
            $table->integer('puntos');
            $table->timestamps();

            $table->foreign('idStudent')
                ->references('id')
                ->on('students')
                ->onDelete('cascade');

            $table->foreign('id_sala')
                ->references('id')
                ->on('ranking')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ranking_analysis');
    }
};
