<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ranking;
use Illuminate\Support\Facades\Hash;
use App\Models\RankingAnalysis;


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
            'cod_room'=>'12345678',
        ]);
        Ranking::create([
            'id_teacher'=>2,
            'name' => 'Test2',
            'cod_room'=>'1234',
        ]);
        Ranking::create([
            'id_teacher'=>1,
            'name' => 'Test1.1',
            'cod_room'=>'123456789',
        ]);
        Ranking::create([
            'id_teacher'=>2,
            'name' => 'Test2.2',
            'cod_room'=>'12345',
        ]);
        RankingAnalysis::create([
            'id_student'=>1,
            'id_rank'=>2,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
        RankingAnalysis::create([
            'id_student'=>1,
            'id_rank'=>1,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
        RankingAnalysis::create([
            'id_student'=>1,
            'id_rank'=>3,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
        RankingAnalysis::create([
            'id_student'=>1,
            'id_rank'=>4,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
        RankingAnalysis::create([
            'id_student'=>2,
            'id_rank'=>3,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
        RankingAnalysis::create([
            'id_student'=>2,
            'id_rank'=>4,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
        RankingAnalysis::create([
            'id_student'=>2,
            'id_rank'=>2,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
        RankingAnalysis::create([
            'id_student'=>2,
            'id_rank'=>1,
            'points'=>0,
            'emotional'=>0,
            'thinking'=>0,
            'responsability'=>0,
            'cooperation'=>0,
            'initiative'=>0
        ]);
    }
}
