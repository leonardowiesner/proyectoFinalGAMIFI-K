<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;
use App\Models\Teacher;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        Student::create([
            'nickname' => 'nil',
            'email' => 'nil@gmail.com',
            'password' => Hash::make('12345678'),
            'name' => 'nil',
            'surnames' => 'pepo',
            'birth_date' => '2003-04-01'
        ]);
        Teacher::create([
            'nickname' => 'nilTeacher',
            'email' => 'nilteacher@gmail.com',
            'password' => Hash::make('12345678'),
            'name' => 'nilTeacher',
            'surnames' => 'pepo',
            'center' => 'ilerna'
        ]);
    }
} 
