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
            'name' => 'required',
            'cod_room' => 'required',

        ]);

        $ranking = new Ranking();
        $ranking->name = $request->name;
        $ranking->cod_room = $request->cod_room;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "Ranking creado exitosamente",
        ]);

    }


    public function addToRanking(Request $request)
    {
        $request->validate([
            'id_user' => 'required',
            'cod_ranking' => 'required',
        ]);

        $ranking = new Ranking();
        $ranking->idUser = $request->idUser;
        $ranking->codeRanking = $request->codeRanking;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "Usuario registrado en el ranking",
        ]);
    }

    public function getRankingbyS(Request $request)
{

    $request->validate([
        "id_student" => "required",
    ]);

    $rankings = ranking_analysis::where('id_student', $request->id_student)->get();

    if ($rankings->count() > 0) {
        return response()->json([
            "status" => 1,
            "msg" => "Se han encontrado las salas correctamente",
            "data" => $rankings
        ]);
    } else {
        return response()->json([
            "status" => 0,
            "msg" => "No se encontraron salas para el usuario especificado",
        ], 404);
    }
}
}
