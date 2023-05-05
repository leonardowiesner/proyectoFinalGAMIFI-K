<?php

namespace App\Http\Controllers;

use App\Models\RankingAnalysis;
use App\Models\SoftSkillEvaluation;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SoftSkillEvaluationController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validar datos de la solicitud
            $request->validate([
                'evaluator_student_id' => 'required|integer',
                'evaluated_student_id' => 'required|integer|different:evaluator_student_id',
                'ranking_analysis_id' => 'required|integer',
                'points' => 'required|integer|min:0|max:1000',
                'soft_skill' => 'required|string',
            ]);

            // Crear nueva evaluación de Soft Skills
            $evaluation = new SoftSkillEvaluation([
                'evaluator_student_id' => $request->evaluator_student_id,
                'evaluated_student_id' => $request->evaluated_student_id,
                'ranking_analysis_id' => $request->ranking_analysis_id,
                'points' => $request->points,
                'soft_skill' => $request->soft_skill,
            ]);



            $weekStartDate = Carbon::now()->startOfWeek()->toDateString();

            $rankingAnalysis = RankingAnalysis::where('id_student', $request->evaluated_student_id)
                ->where('id_rank', $request->ranking_analysis_id)
                ->first();
            $evaluatorRankingAnalysis = RankingAnalysis::where('id_student', $request->evaluator_student_id)
                //   ->where('week_start_date', $weekStartDate)
                ->where('id_rank', $request->ranking_analysis_id)
                ->first();

            // Si no existe un registro de RankingAnalysis, crea uno.
            if (!$evaluatorRankingAnalysis) {
                $evaluatorRankingAnalysis = new RankingAnalysis([
                    'id_student' => $request->evaluator_student_id,
                    'id_rank' => 1, // Asegúrate de establecer el valor adecuado para tu aplicación
                    'points' => 0, // Puedes establecer el valor inicial que necesites
                    'weeklyPoints' => 1000, // O la cantidad de puntos semanales predeterminada.
                    'week_start_date' => $weekStartDate,
                    'emotional' => 0,
                    'thinking' => 0,
                    'responsability' => 0,
                    'cooperation' => 0,
                    'initiative' => 0,
                    'accepted' => 0,
                ]);
                $evaluatorRankingAnalysis->save();
            }
            if ($evaluatorRankingAnalysis->weeklyPoints < $request->points) {
                return response()->json(['error' => 'No tienes suficientes puntos semanales para asignar.'], 400);
            }


            // Continúa con el resto del código ...
            // Restar los puntos semanales del evaluador
            $evaluatorRankingAnalysis->weeklyPoints -= $request->points;
            $evaluatorRankingAnalysis->save();

            // Continúa con el resto del código ...
            $softSkillField = $request->soft_skill;
            $rankingAnalysis[$softSkillField] += $request->points;

            // Guarda los cambios en la base de datos
            $rankingAnalysis->save();

            // Guardar evaluación en la base de datos
            $evaluation->save();

            // Devolver una respuesta de éxito
            return response()->json(['message' => 'Soft Skill Evaluation successfully stored.']);
        } catch (\Exception $e) {
            // Si algo falla, registra el error y devuelve un mensaje de error genérico
            Log::error("Error al guardar la evaluación de Soft Skills: {$e->getMessage()} - En la línea {$e->getLine()} del archivo {$e->getFile()}");
            return response()->json(['error' => 'Error al guardar la evaluación de Soft Skills.'], 500);
        }
    }

    public function subtractWeeklyPoints($points)
    {
        $this->weeklyPoints -= $points;
    }

    public function getEvaluationsByStudent($student_id)
    {
        // Obtener evaluaciones de Soft Skills para el estudiante especificado
        $evaluations = SoftSkillEvaluation::where('evaluated_student_id', $student_id)->get();

        // Devolver las evaluaciones como respuesta JSON
        return response()->json($evaluations);
    }

    public function getStudents(Request $request)
    {
        // Obtener todos los estudiantes
        $students = Student::all();

        // Devolver la lista de estudiantes como respuesta JSON
        return response()->json($students);
    }

    public function getHistorial($id_rank)
    {
        /* // Validar la solicitud del cliente
        $request->validate([
            'ranking_analysis_id' => 'required',
        ]); */
        // Obtener todos los registros de StudentEvaluation ordenados por fecha de creación
        $studentEvaluations = SoftSkillEvaluation::where("ranking_analysis_id", $id_rank)
            ->orderBy('created_at', 'desc')
            ->get();
        // Devolver los registros en formato JSON
        if ($studentEvaluations->count() > 0) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han encontrado las Practica del student en el rank",
                "data" => $studentEvaluations
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontraron practi para el usuario especificado",
            ], 404);
        }
    }

    public function getHistorialbyStudentEvaluator($request)
    {
        // Validar la solicitud del cliente
        $request->validate([
            'rankingId' => 'required',
            'id_student' => 'required',
        ]);
        return "si";
        // Obtener todos los registros de StudentEvaluation ordenados por fecha de creación
        $studentEvaluations = SoftSkillEvaluation::where("ranking_analysis_id", $request->rankingId)
            ->where("evaluator_student_id", $request->id_student)
            ->get();
        // Devolver los registros en formato JSON
        if ($studentEvaluations->count() > 0) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han encontrado las Practica del student en el rank",
                "data" => $studentEvaluations
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontraron practi para el usuario especificado",
            ], 404);
        }
    }
    public function getHistorialbyStudentEvaluated($request)
    {
        // Validar la solicitud del cliente
        $request->validate([
            'id_rank' => 'required',
            'id_student' => 'required',
        ]);
        // Obtener todos los registros de StudentEvaluation ordenados por fecha de creación
        $studentEvaluations = SoftSkillEvaluation::where("ranking_analysis_id", $request->id_rank)
            ->where("evaluated_student_id", $request->id_student)
            ->orderBy('created_at', 'desc')
            ->get();
        // Devolver los registros en formato JSON
        if ($studentEvaluations->count() > 0) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han encontrado las Practica del student en el rank",
                "data" => $studentEvaluations
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontraron practi para el usuario especificado",
            ], 404);
        }
    }
    public function getHistorialbySkill($request)
    {
        // Validar la solicitud del cliente
        $request->validate([
            'id_rank' => 'required',
            'soft_skill' => 'required',
        ]);
        // Obtener todos los registros de StudentEvaluation ordenados por fecha de creación
        $studentEvaluations = SoftSkillEvaluation::where("ranking_analysis_id", $request->id_rank)
            ->where("soft_skill", $request->soft_skill)
            ->orderBy('created_at', 'desc')
            ->get();
        // Devolver los registros en formato JSON
        if ($studentEvaluations->count() > 0) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han encontrado las Practica del student by skill",
                "data" => $studentEvaluations
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontraron practi para el usuario especificado",
            ], 404);
        }
    }

    public function getHistorialbyDate($request)
    {
        // Validar la solicitud del cliente
        $request->validate([
            'id_rank' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);
        // Obtener todos los registros de StudentEvaluation ordenados por fecha de creación
        $studentEvaluations = SoftSkillEvaluation::where("ranking_analysis_id", $request->id_rank)
            ->where("created_at", $request->start_date)
            ->orderBy('created_at', 'desc')
            ->get();


        foreach ($studentEvaluations as $key) {
            if ($key["created_at"] <= $request->end_date) {
                $historialFiltred[] = $key; 
            }
        }
        // Devolver los registros en formato JSON
        if ($historialFiltred->count() > 0) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han encontrado las Practica del student by skill",
                "data" => $historialFiltred
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontraron practi para el usuario especificado",
            ], 404);
        }
    }

    public function deleteStudentEvaluation($id)
    {
        // Buscar el registro de StudentEvaluation por ID
        $evaluation = SoftSkillEvaluation::find($id);

        if (!$evaluation) {
            // Si no se encuentra la evaluación, devolver un error 404
            return response()->json(['error' => 'No se encontró la evaluación especificada.'], 404);
        }

        // Obtener los puntos a eliminar
        $points = $evaluation->points;

        // Obtener el evaluador y el evaluado
        $evaluator = $evaluation->evaluator_student_id;
        $evaluated = $evaluation->evaluated_student_id;


        // Sumar los puntos eliminados en la tabla de ranking_analyses
        $rank = RankingAnalysis::where('id_student', $evaluator)
            ->where('id_rank', $evaluation->ranking_analysis_id)
            ->increment('weeklyPoints', $points);

        // Eliminar la evaluación
        $evaluation->delete();

        return response()->json(['message' => 'Evaluación eliminada correctamente.']);
    }
}
