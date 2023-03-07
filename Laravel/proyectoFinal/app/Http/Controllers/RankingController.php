<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ranking;
use App\Models\ranking_analysis;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RankingController extends Controller
{

    public function createRanking(Request $request)
    {
        //funciona correctamente
        $request->validate([
            "id_teacher" => "required|exists:teachers,id",
            "name" => "nullable|string",
            "cod_room" => "required|unique:rankings,cod_room"
        ]);

        $ranking = Ranking::create([
            "id_teacher" => $request->id_teacher,
            "name" => $request->name,
            "cod_room" => Hash::make($request->cod_room)
        ]);

        return response()->json([
            "status" => 1,
            "msg" => "Se ha creado la sala correctamente",
            "data" => $ranking
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

    /* public function addStudentToRanking(Request $request, $ranking_id)
{
    // Obtener los datos del estudiante
    $student = Student::find($request->student_id);
    if (!$student) {
        return response()->json(['error' => 'El estudiante no existe.'], 404);
    }

    // Obtener el ranking correspondiente
    $ranking = Ranking::find($ranking_id);
    if (!$ranking) {
        return response()->json(['error' => 'El ranking no existe.'], 404);
    }

    // Crear el nuevo registro de ranking_analyses
    $analysis = new ranking_analyses;
    $analysis->id_student = $student->id;
    $analysis->id_rank = $ranking->id;
    $analysis->points = 0; // Asignar puntos iniciales
    $analysis->save();

    return response()->json(['success' => true, 'message' => 'El estudiante ha sido añadido correctamente al ranking.']);
} */

    public function getRankingByStuden($id)
    {
        //esto funciona perfecto
        // $request->validate([
        //     "id_student" => "required",
        // ]);

        $rankings = DB::table('Rankings')
              ->join('ranking_analyses', 'Rankings.id', '=', 'ranking_analyses.id_rank')
              ->select('Rankings.id', 'Rankings.name', 'Rankings.id_teacher', 'Rankings.cod_room', 'ranking_analyses.id', 'ranking_analyses.id_student', 'ranking_analyses.points')
              ->where('ranking_analyses.id_student', $id)
              ->get();
            

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
