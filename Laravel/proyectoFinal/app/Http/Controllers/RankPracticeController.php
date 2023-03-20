<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RankPractice;
use App\Models\ranking_analysis;


class RankPracticeController extends Controller
{

    public function createPractice(Request $request)
    {
        // Validar los datos enviados por el cliente
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'id_teacher' => 'required',
            "date_end" => "required",
            "id_rank" => "required",
        ]);

        // Crear la nueva práctica
        $practice = RankPractice::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'id_teacher' => $request->input('id_teacher'),
            'date_end' => $request->input('date_end'),
        ]);

        // Actualizar los registros en la tabla de análisis de rankings
        Ranking_analysis::where('id_rank', $request->id_rank)->update(['id_practice' => $practice->id]);

        // Devolver una respuesta con un mensaje de éxito
        return response()->json(['message' => 'La práctica ha sido creada correctamente.']);
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
