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
        Schema::create('practice_info', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('id_student');
            $table->unsignedBigInteger('id_practice');
            $table->integer('points_practice')->nullable();
            $table->string('name_file')->unique()->nullable();
            $table->date('deadline_practice');
            $table->timestamps();


            $table->foreign('id_student')
                ->references('id')
                ->on('students')
                ->onDelete('cascade');
            $table->foreign('id_practice')
                ->references('id')
                ->on('rank_practices')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
