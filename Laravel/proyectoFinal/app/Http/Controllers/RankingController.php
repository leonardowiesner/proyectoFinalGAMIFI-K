<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ranking;
use App\Models\ranking_analysis;
use Illuminate\Support\Facades\DB;

class RankingController extends Controller
{
    public function createRanking(Request $request)
    {
        $request->validate([
            'id_teacher'=>'required',
            'nombre' => 'required',
            'codigo_sala' => 'required',
        ]);

        $ranking = new Ranking();
        $ranking->nombre = $request->nombre;
        $ranking->codigo_sala = $request->codigo_sala;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario al ranking exitoso!",
        ]);
    }


    public function addToRanking(Request $request)
    {
        $request->validate([
            'idUser' => 'required',
            'codeRanking' => 'required',
        ]);

        $ranking = new Ranking();
        $ranking->idUser = $request->idUser;
        $ranking->codeRanking = $request->codeRanking;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario exitoso!",
        ]);
    }

    public function getRanking(Request $request){

    

        $ranking = DB::table('ranking_analysis')
            ->where('idStudent', '=', $request->id)
            ->orderByDesc('puntos') 
            ->get();
                return response()->json([
                    "status" => 1,
                    "msg" => "¡Rankings encotrados!",
                    "data" => $ranking
                ]);
       
    } 
}
