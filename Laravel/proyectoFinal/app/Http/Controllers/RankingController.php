<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ranking;
use App\Models\Ranking_analysis;
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

    public function addStudentToRanking(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'id_student' => 'required|exists:students,id',
            'points' => 'required|integer',
            'cod_room' => 'required|string'
        ]);

        $id_student = $request->input('id_student');
        $points = $request->input('points');
        $cod_room = $request->input('cod_room');

        // Hash del código de sala proporcionado por el usuario

        // Buscar el ranking con el código de sala proporcionado y verificar si el código hash coincide
        foreach (Ranking::all() as $ranking) {
            if (!Hash::check($cod_room, $ranking['cod_room'])) {
                continue;
            }
            // Si el ranking existe y el código hash coincide, agregar el estudiante a la tabla ranking_analysis
            Ranking_analysis::create([
                'id_student' => $id_student,
                'id_rank' => $ranking->id,
                'points' => $points
            ]);

            return response()->json(['message' => 'Estudiante agregado correctamente a la tabla ranking_analysis.']);
        }
        // Si el ranking no existe o el código hash no coincide, devolver un error
        return response()->json(['error' => 'No se pudo agregar el estudiante al ranking debido a que el código de la sala no coincide.'], 400);
    }

    public function getRankingAnalysesByRankId($id)
    {
        $rankingAnalyses = DB::table('ranking_analyses')
            ->where('id_rank', $id)
            ->orderByDesc('points')
            ->get();
    
        return $rankingAnalyses;
    }
    
    public function getRankingById($id){
        $ranking = DB::table('rankings')
        ->where('id', $id)
        ->orderByDesc('points')
        ->get();

    return $ranking;
    }

    public function getRankingByTeacher($id){
        $rankings = DB::table('Rankings')
        ->select('Rankings.id', 'Rankings.name', 'Rankings.id_teacher', 'Rankings.cod_room')
        ->where('Rankings.id_teacher', $id)
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
