<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ranking;
use Illuminate\Support\Facades\Hash;
use App\Models\ranking_analysis;


class RankingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ranking::create([
            'id_teacher'=>1,
            'name' => 'Test',
            'cod_room'=>Hash::make('12345678'),
        ]);
        Ranking::create([
            'id_teacher'=>1,
            'name' => 'Test2',
            'cod_room'=>Hash::make('1234'),
        ]);
        Ranking_analysis::create([
            'id_student'=>1,
            'id_rank'=>1,
            'points'=>100
        ]);
        Ranking_analysis::create([
            'id_student'=>1,
            'id_rank'=>2,
            'points'=>50
        ]);
    }
}
