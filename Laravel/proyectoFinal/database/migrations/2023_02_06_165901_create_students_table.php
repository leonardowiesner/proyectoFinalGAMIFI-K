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
    public function up()
    {
        $faker = Faker\Factory::create();

        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surnames');
            $table->string('img')->default("https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png");
            $table->string('email')->unique();
            $table->string('password');
            $table->string('nickname')->unique();
            $table->date('birth_date');
            $table->timestamps();
        });

        for ($i = 0; $i > 50; $i++) {
            DB::table('students')->insert(
                array(
                    'nickname' => $faker->firstName(),
                    'email' => $faker->email(),
                    'password' => Hash::make('12345678'),
                    'name' => $faker->firstName(),
                    'surnames' => $faker->firstName(),
                    'birth_date' => '2003-04-01'
                )
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
};
