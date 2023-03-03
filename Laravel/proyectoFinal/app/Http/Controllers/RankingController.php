<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ranking;
use App\Models\ranking_analysis;

class rankinController extends Controller
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

    public function getRanking($id){


        $ranking = ranking_analysis::where("idStudent", "=", $id)->first();

        if (isset($ranking->id)) {
                return response()->json([
                    "status" => 1,
                    "msg" => "¡Rankings encotrados!",
                    "data" => $ranking
                ]);
        }else{
            return response()->json([
                "status" => 0,
                "msg" => "rankings no registrado",
            ], 404);
        }
    }
}
