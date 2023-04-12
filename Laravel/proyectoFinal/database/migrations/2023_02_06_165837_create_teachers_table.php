<?php

use App\Models\Teacher;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surnames');
            $table->string('img')->default("https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png");  
            $table->string('email')->unique();
            $table->string('password');
            $table->string('nickname')->unique();
            $table->string('center');
            $table->timestamps();
        });

        Teacher::create([
            'nickname' => 'nilTeacher',
            'email' => 'nilteacher@gmail.com',
            'password' => Hash::make('12345678'),
            'name' => 'nilTeacher',
            'surnames' => 'pepo',
            'center' => 'ilerna'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teachers');
    }
};