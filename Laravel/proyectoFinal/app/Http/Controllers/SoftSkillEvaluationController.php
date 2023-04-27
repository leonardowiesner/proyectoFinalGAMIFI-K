<?php

namespace App\Http\Controllers;

use App\Models\SoftSkillEvaluation;
use App\Models\Student;
use App\Models\RankingAnalysis;
use Illuminate\Http\Request;

class SoftSkillEvaluationController extends Controller
{
    public function store(Request $request)
    {
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
    
        $rankingAnalysis = RankingAnalysis::where('id_student', $request->evaluated_student_id)
            ->where('week_start_date', /* fecha de inicio de la semana actual */)
            ->first();
    
        if ($rankingAnalysis) {
            // Actualiza el campo correspondiente de la soft skill con los nuevos puntos
            $softSkillField = $request->soft_skill;
            $rankingAnalysis->$softSkillField += $request->points;
    
            // Opcionalmente, actualiza también los puntos semanales y/o totales
            $rankingAnalysis->weeklyPoints += $request->points;
            $rankingAnalysis->points += $request->points;
    
            // Guarda los cambios en la base de datos
            $rankingAnalysis->save();
        } else {
            // Maneja el caso en el que no se encuentre el registro de RankingAnalysis correspondiente
        }
    
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
        return response()->json(['studentEvaluations' => $studentEvaluations]);
    }
}
