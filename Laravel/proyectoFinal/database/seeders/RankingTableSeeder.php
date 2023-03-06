<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ranking;
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
            'cod_room'=>1234,
        ]);
        Ranking_analysis::create([
            'id_student'=>1,
            'id_room'=>1,
            'points'=>100
        ]);
    }
}
