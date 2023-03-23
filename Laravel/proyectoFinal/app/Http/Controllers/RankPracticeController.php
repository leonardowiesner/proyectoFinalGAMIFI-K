<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RankPractice;
use App\Models\ranking_analysis;
use App\Models\PracticeInfo;


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
    $students = Ranking_analysis::where('id_rank', $request->input('id_rank'))->pluck('id_student');
    
    
    // Crear una entrada en la tabla de prácticas para cada estudiante
    foreach ($students as $student) {
       //return response($student);
        PracticeInfo::create([
            'id_student' => $student,
            'id_practice' => $practice->id,
            'deadline_practice'=> $request->date_end
        ]);
    }

    return response()->json(['message' => 'La práctica se ha creado correctamente.']);
}

    /* 
    Esto es para guardarlo en la tabla de 

    public function guardarDocumento(Request $request)
    {
        $documento = $request->file('documento');
        $contenido = file_get_contents($documento);

        $registro = new Documento();
        $registro->nombre = $documento->getClientOriginalName();
        $registro->tipo = $documento->getClientOriginalExtension();
        $registro->contenido = $contenido;
        $registro->save();

        return "Documento guardado correctamente.";
    } */
}
