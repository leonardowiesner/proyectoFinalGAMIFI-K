<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ranking;
use App\Models\RankingAnalysis;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use PhpParser\Node\Stmt\TryCatch;

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
            "cod_room" => $request->cod_room

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
            if ($cod_room == $ranking['cod_room']) {
                continue;
            }
            // Si el ranking existe y el código hash coincide, agregar el estudiante a la tabla RankingAnalysis
            RankingAnalysis::create([
                'id_student' => $id_student,
                'id_rank' => $ranking->id,
                'points' => $points
            ]);

            return response()->json(['message' => 'Estudiante agregado correctamente a la tabla RankingAnalysis.']);
        }
        // Si el ranking no existe o el código hash no coincide, devolver un error
        return response()->json(['error' => 'No se pudo agregar el estudiante al ranking debido a que el código de la sala no coincide.'], 400);
    }
    public function getRankingAnalysesByRankId($id)
    {

        $rankingAnalyses = DB::table('ranking_analyses')
            ->join('students', 'ranking_analyses.id_student', '=', 'students.id')
            ->where('ranking_analyses.id_rank', $id)
            ->select('ranking_analyses.*', 'students.name')
            ->orderByDesc('points')
            ->get();


        return $rankingAnalyses;
    }

    public function changeCodeRank(Request $request)
    {
        $request->validate([
            'id_rank' => 'required',
            'new_code' => 'required',
        ]);
    
        $ranking = Ranking::find($request->input('id_rank'));
    
        if (!$ranking) {
            return response()->json(['error' => 'No se encontró el ranking especificado.'], 404);
        }
    
        $ranking->cod_room = $request->input('new_code');
        $ranking->save();
    
        return response()->json(['status' => 1, 'message' => 'El código del ranking se ha actualizado correctamente.']);
    }

    public function getRankingById($id)
    {
        $ranking = DB::table('rankings')
            ->where('id', $id)
            ->orderByDesc('points')
            ->get();

        return $ranking;
    }
    public function getRankingByTeacher($id)
    {
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
            ->select('Rankings.id', 'Rankings.name', 'Rankings.id_teacher', 'Rankings.cod_room', 'ranking_analyses.id_student','ranking_analyses.accepted', 'ranking_analyses.points')
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
    public function deleteRanking($id)
    {
        try {
            /* $bearerToken = request()->bearerToken();
            $user = PersonalAccessToken::findToken($bearerToken)->tokenable;

            echo "nopeta";die;
            if ($user->center) { */
            // Buscar el ranking por ID
            $ranking = Ranking::find($id);

            if (!$ranking) {
                // Si no se encuentra el ranking, devolver un error 404
                return response()->json(['error' => 'No se encontró el ranking especificado.'], 404);
            }

            // Eliminar todos los registros relacionados en la tabla de análisis de rankings
            $rankingAnalyses = RankingAnalysis::where('id_rank', $id)->delete();

            // Eliminar el ranking
            $ranking->delete();

            return response()->json(['message' => 'El ranking y sus registros relacionados han sido eliminados correctamente.']);
            /* } else {
                return response()->json(['message' => 'No estas autorizado.']);
            } */
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Peto el token.'], 404);
        }
    }
    public function deleteStudentRankingAnalysis($id_rank, $id_student)
    {
        // Buscar el registro que se quiere eliminar
        $rankingAnalysis = RankingAnalysis::where('id_rank', $id_rank)
            ->where('id_student', $id_student)
            ->first();

        if ($rankingAnalysis) {
            // Si se encontró el registro, eliminarlo
            $rankingAnalysis->delete();

            return response()->json(['message' => 'Registro eliminado correctamente.']);
        } else {
            // Si no se encontró el registro, devolver un error
            return response()->json(['error' => 'No se pudo encontrar el registro que se quiere eliminar.'], 404);
        }
    }
    public function editRankingPoints(Request $request)
    {
        $id_student = $request->input('id_student');
        $id_rank = $request->input('id_rank');
        $new_points = $request->input('points');

        $rankingAnalysis = DB::table('ranking_analyses')
            ->where('id_student', $id_student)
            ->where('id_rank', $id_rank)
            ->first();

        if (!$rankingAnalysis) {
            // Si no existe el registro en la tabla, podrías lanzar una excepción o hacer algo en consecuencia
            return false;
        }

        DB::table('ranking_analyses')
            ->where('id_student', $id_student)
            ->where('id_rank', $id_rank)
            ->update(['points' => $new_points]);

        return true;
    }

    public function updateRankingName(Request $request, $id_rank)
    {
        // Validar los datos recibidos
        $request->validate([
            'name' => 'required|string'
        ]);

        $new_name = $request->input('name');

        // Buscar el ranking por ID
        $ranking = Ranking::find($id_rank);

        if (!$ranking) {
            // Si no se encuentra el ranking, devolver un error 404
            return response()->json(['error' => 'No se encontró el ranking especificado.'], 404);
        }

        // Actualizar el nombre del ranking
        $ranking->name = $new_name;
        $ranking->save();

        return response()->json(['message' => 'El nombre del ranking ha sido actualizado correctamente.', 'data' => $ranking]);
    }

    public function acceptStudent(Request $request)
    {
        // Validar la solicitud del cliente
        $request->validate([
            'id_student' => 'required',
            'id_rank' => 'required',
        ]);

        // Buscar el RankingAnalysis por id_student e id_rank
        $rankAnalysis = RankingAnalysis::where('id_student', $request->input('id_student'))
            ->where('id_rank', $request->input('id_rank'))
            ->first();

        if (!$rankAnalysis) {
            // Si no se encuentra el RankingAnalysis, devolver un error 404
            return response()->json(['error' => 'No se encontró el RankingAnalysis especificado.'], 404);
        }

        // Actualizar el campo "accepted" en el RankingAnalysis
        $rankAnalysis->accepted = 1;
        $rankAnalysis->save();

        return response()->json(['message' => 'Estudiante aceptado correctamente en el ranking.']);
    }

    public function denegateStudent(Request $request)
    {
        // Validar la solicitud del cliente
        $request->validate([
            'id_student' => 'required',
            'id_rank' => 'required',
        ]);

        // Buscar la fila en la tabla ranking_analyses
        $rankingAnalysis = RankingAnalysis::where('id_student', $request->input('id_student'))
            ->where('id_rank', $request->input('id_rank'))
            ->first();

        if (!$rankingAnalysis) {
            // Si no se encuentra la fila, devolver un error 404
            return response()->json(['error' => 'No se encontró el análisis de ranking especificado.'], 404);
        }

        // Eliminar la fila de la tabla ranking_analyses
        $rankingAnalysis->delete();

        return response()->json(['message' => 'Análisis de ranking eliminado correctamente.']);
    }
}
