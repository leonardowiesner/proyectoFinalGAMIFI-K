<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RankPractice;
use App\Models\RankingAnalysis;
use App\Models\PracticeInfo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;


class RankPracticeController extends Controller
{


    public function createPractice(Request $request)
    {
        // Validar los datos enviados por el cliente
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            "date_end" => "required",
            "id_rank" => "required",
        ]);

        // Crear la nueva práctica
        $practice = RankPractice::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'id_rank' => $request->input('id_rank'),
        ]);



        // Buscar los estudiantes que tienen el ranking especificado
        $students = RankingAnalysis::where('id_rank', $request->input('id_rank'))->pluck('id_student');


        // Crear una entrada en la tabla de prácticas para cada estudiante
        foreach ($students as $student) {
            //return response($student);
            PracticeInfo::create([
                'id_student' => $student,
                'id_practice' => $practice->id,
                'deadline_practice' => $request->date_end
            ]);
        }

        return response()->json(['message' => 'La práctica se ha creado correctamente.']);
    }

    public function editPracticePoints(Request $request)
    {
        // Validar los datos enviados por el cliente
        $request->validate([
            'id_student' => 'required',
            'id_practice' => 'required',
            'points_practice' => 'required|numeric',
        ]);

        // Buscar la práctica del estudiante
        $practice = PracticeInfo::where('id_student', $request->input('id_student'))
            ->where('id_practice', $request->input('id_practice'))
            ->first();

        if (!$practice) {
            // Si no se encuentra la práctica, devolver un error 404
            return response()->json(['error' => 'No se encontró la práctica especificada.'], 404);
        }

        // Actualizar los puntos de práctica
        $practice->points_practice = $request->input('points_practice');
        $practice->save();


        $id_student = $practice->id_student;
        $id_rank = RankPractice::where('id', $request->input('id_practice'))
            ->first();;

        $rankingAnalysis = RankingAnalysis::where('id_student', $id_student)
            ->where('id_rank', $id_rank->id_rank)
            ->first();

        if ($rankingAnalysis) {
            $rankingAnalysis->points += $request->input('points_practice');
            $rankingAnalysis->save();
        }
        return response()->json(['message' => 'Los puntos de práctica se han actualizado correctamente.']);
    }

    public function editPracticeDateline(Request $request)
    {
        // Validar los datos enviados por el cliente
        $request->validate([
            'id_student' => 'required',
            'id_practice' => 'required',
            'date_end' => 'required',
        ]);

        // Buscar la práctica del estudiante
        $practice = PracticeInfo::where('id_student', $request->input('id_student'))
            ->where('id_practice', $request->input('id_practice'))
            ->first();

        if (!$practice) {
            // Si no se encuentra la práctica, devolver un error 404
            return response()->json(['error' => 'No se encontró la práctica especificada.'], 404);
        }

        // Actualizar los puntos de práctica
        $practice->deadline_practice = $request->input('date_end');
        $practice->save();

        return response()->json(['message' => 'La fecha de entrega se ha actualizado correctamente.']);
    }
    public function downloadPracticeFile(Request $request)
    {
        $request->validate([
            'id_student' => 'required',
            'id_practice' => 'required',
        ]);
    
        $practice = PracticeInfo::where('id_student', $request->input('id_student'))
            ->where('id_practice', $request->input('id_practice'))
            ->first();
    
        if (!$practice) {
            return response()->json(['error' => 'No se encontró la práctica especificada.'], 404);
        }
    
        $pathToFile = storage_path('app/public/practices/' . $practice->name_file);
    
        if (!file_exists($pathToFile)) {
            return response()->json(['error' => 'No se encontró el archivo especificado.'], 404);
        }
    
        return response()->download($pathToFile);
    }
    

    
    public function getPracticesDelivered(Request $request)
    {
        //busca todas las practicas de un estudiante en un ranking
        $request->validate([
            'rankingId' => 'required',
            'id_student' => 'required',
        ]);
        
        // Unir las tres tablas utilizando join
        $data = DB::table('rank_practices')
            ->join('practice_info', 'rank_practices.id', '=', 'practice_info.id_practice')
            ->join('students', 'practice_info.id_student', '=', 'students.id')
            ->select('rank_practices.*', 'practice_info.*', 'students.*')
            ->where('rank_practices.id_rank', $request->input('rankingId'))
            ->where('practice_info.id_student', $request->input('id_student'))
            ->get();
    
        if ($data->count() > 0) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han encontrado las Practica del student en el rank",
                "data" => $data
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontraron practi para el usuario especificado",
            ], 404);
        }
    }
    


    public function deletePractice(Request $request)
    {
        // Validar los datos enviados por el cliente
        $request->validate([
            'id_practice' => 'required',
        ]);
    
        // Buscar la práctica por ID
        $practice = RankPractice::find($request->input('id_practice'));
    
        if (!$practice) {
            // Si no se encuentra la práctica, devolver un error 404
            return response()->json(['error' => 'No se encontró la práctica especificada.'], 404);
        }
    
        // Eliminar las entradas relacionadas en la tabla de prácticas
        PracticeInfo::where('id_practice', $practice->id)->delete();
    
        // Eliminar la práctica
        $practice->delete();
    
        return response()->json(['message' => 'La práctica se ha eliminado correctamente.']);
    }

    public function uploadPracticeFile(Request $request)
    {

        // Validar el archivo enviado por el cliente
        $request->validate([
            'id_student' => 'required',
            'id_practice' => 'required',
            'file' => 'required|file|mimes:pdf|max:2048',
        ]);
        error_log('id_student: ' . $request->input('id_student'));
        error_log('id_practice: ' . $request->input('id_practice'));
        error_log('file: ' . json_encode($request->file('file')));
        // Buscar la práctica por ID
        $practice = PracticeInfo::where('id_student', $request->input('id_student'))
            ->where('id_practice', $request->input('id_practice'))
            ->first();

        if (!$practice) {
            // Si no se encuentra la práctica, devolver un error 404
            return response()->json(['error' => 'No se encontró la práctica especificada.'], 404);
        }


        // Obtener el archivo del request
        $file = $request->file('file');

        // Generar un nombre único para el archivo
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();

        // Guardar el archivo en el almacenamiento local
        $file->storeAs('public/practices', $fileName);

        // Actualizar el campo "name_file" en la práctica
        $practice->name_file = $fileName;
        $practice->save();

        return response()->json(['message' => 'Archivo guardado correctamente.']);
    }

    public function getPractice(Request $request)
    {
        // Validar el archivo enviado por el cliente
        $request->validate([
            'id_student' => 'required',
            'rankingId' => 'required',
        ]);

        $rankings = DB::table('rank_practices')
            ->join('practice_info', 'rank_practices.id', '=', 'practice_info.id_practice')
            ->where('practice_info.id_student', $request->input('id_student'))
            ->where('rank_practices.id_rank', $request->input('rankingId'))
            ->select('rank_practices.id', 'rank_practices.name', 'rank_practices.description', 'practice_info.points_practice', 'practice_info.deadline_practice')
            ->get();

        if ($rankings->count() > 0) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han encontrado las Practica correctamente",
                "data" => $rankings
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se encontraron practi para el usuario especificado",
            ], 404);
        }
    }
}
