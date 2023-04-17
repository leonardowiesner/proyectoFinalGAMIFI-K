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
        Schema::create('ranking_analyses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_student');
            $table->unsignedBigInteger('id_rank');
            $table->integer('points');
            $table->boolean('accepted')->default(0); // Agregar el campo "accepted" con valor predeterminado de 0
            $table->timestamps();

            $table->foreign('id_student')
                ->references('id')
                ->on('students')
                ->onDelete('cascade');

            $table->foreign('id_rank')
                ->references('id')
                ->on('rankings')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ranking_analyses');
    }
};
