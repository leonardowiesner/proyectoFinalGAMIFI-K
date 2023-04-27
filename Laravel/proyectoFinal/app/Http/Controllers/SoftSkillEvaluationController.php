<?php

namespace App\Http\Controllers;

use App\Models\ranking_analysis;
use App\Models\SoftSkillEvaluation;
use App\Models\Student;
use Illuminate\Http\Request;

class SoftSkillEvaluationController extends Controller
{
    // Agrega cualquier otro método necesario para manejar las evaluaciones de Soft Skills
    public function store(Request $request)
    {
        // Validar datos de la solicitud
        $request->validate([
            'evaluator_student_id' => 'required|integer',
            'evaluated_student_id' => 'required|integer|different:evaluator_student_id',
            'ranking_analysis_id' => 'required|integer',
            'points' => 'required|integer|min:0|max:1000',
            'week_start_date' => 'required|date',
        ]);

        // Crear nueva evaluación de Soft Skills
        $evaluation = new SoftSkillEvaluation([
            'evaluator_student_id' => $request->evaluator_student_id,
            'evaluated_student_id' => $request->evaluated_student_id,
            'ranking_analysis_id' => $request->ranking_analysis_id,
            'points' => $request->points,
            'week_start_date' => $request->week_start_date,
        ]);

        // Guardar evaluación en la base de datos
        $evaluation->save();

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Soft Skill Evaluation successfully stored.']);
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
        $rank = ranking_analysis::where('id_student', $evaluator)
            ->where('id_rank', $evaluation->ranking_analysis_id)
        ->increment('weeklyPoints', $points);
        
        // Eliminar la evaluación
        $evaluation->delete();

        return response()->json(['message' => 'Evaluación eliminada correctamente.']);
    }
}
