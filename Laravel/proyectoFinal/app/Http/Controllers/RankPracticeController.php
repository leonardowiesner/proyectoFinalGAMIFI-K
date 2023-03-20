<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RankPractice;


class RankPracticeController extends Controller
{

    
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
