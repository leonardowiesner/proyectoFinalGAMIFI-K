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
    public function up()
{
    Schema::create('soft_skill_evaluations', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('evaluator_student_id');
        $table->unsignedBigInteger('evaluated_student_id');
        $table->unsignedBigInteger('ranking_analysis_id');
        $table->integer('points');
        $table->string('soft_skill'); // Añade esta línea
        $table->timestamps();

        // Foreign key constraints
        $table->foreign('evaluator_student_id')->references('id')->on('students')->onDelete('cascade');
        $table->foreign('evaluated_student_id')->references('id')->on('students')->onDelete('cascade');
        $table->foreign('ranking_analysis_id')->references('id')->on('ranking_analyses')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('soft_skill_evaluations');
    }
};