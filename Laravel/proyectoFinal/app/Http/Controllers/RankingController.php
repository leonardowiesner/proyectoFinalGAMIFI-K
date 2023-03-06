<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ranking;


class rankinController extends Controller
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

/*             return response()->json([
                "status" => 0,
                "msg" => "Ranking catch ERROR",
            ]);
*/
    }


    public function addToRanking(Request $request)
    {
        $request->validate([
            'id_user' => 'required',
            'cod_ranking' => 'required',
        ]);

        $ranking = new Ranking();
        $ranking->idUser = $request->idUser;
        $ranking->codRanking = $request->codRanking;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "Usuario registrado en el ranking",
        ]);
    }

    public function getRanking(Request $request)
    {

        $request->validate([
            "id_user" => "required",
            "cod_room" => "required"
        ]);

        $ranking = Ranking::where('id_user', $request->idUser)
            ->where('cod_room', $request->codigoSala)
            ->get();

        if (isset($ranking->id)) {
            return response()->json([
                "status" => 1,
                "msg" => "Se ah encontrado la sala correctamente",
                "data" => $ranking
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontro la sala",
            ], 404);
        }
    }
}
