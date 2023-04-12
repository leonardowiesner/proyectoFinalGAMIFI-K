<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        Schema::create('rankings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->unsignedBigInteger('id_teacher');
            $table->string('cod_room')->unique();
            $table->timestamps();

            $table->foreign('id_teacher')
                ->references('id')
                ->on('teachers')
                ->onDelete('cascade');
        });



        DB::table('rankings')->insert(
            array(
                'id_teacher' => 1,
                'name' => 'angular',
                'cod_room' => Hash::make('12345678'),
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ranking');
    }
};
