<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function register(Request $request) {
        $request->validate([
       'name' => 'required',
        'last_name'=> 'required',
        'nick_name'=> 'required',
        'email'=> 'required|email|unique:teachers',
        'password'=> 'required',
        'school_center'=> 'required'
        ]);
        $teacher = new Teacher();
        $teacher->name = $request->name;
        $teacher->last_name = $request->last_name;
        $teacher->nick_name = $request->nick_name;
        $teacher->email = $request->email;
        $teacher->password = Hash::make($request->password);
        $teacher->school_center = $request->school_center;
     
        $teacher->save();
        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de profesor exitoso!",
        ]);
    }

    public function login(Request $request) {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);
        $teacher = Teacher::where("email", "=", $request->email)->first();
        if( isset($teacher->id) ){
            if(Hash::check($request->password, $teacher->password)){
                //creamos el token
                $token = $teacher->createToken("auth_token")->plainTextToken;
                 //si está todo ok
                 return response()->json([
                    "status" => 1,
                    "msg" => "¡Usuario logueado exitosamente!",
                    "access_token" => $token
                ]);
            }else{
                return response()->json([
                    "status" => 0,
                    "msg" => "La password es incorrecta",
                ], 404);
            }
        }else{
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no registrado",
            ], 404);
        }
    }
    public function teacherProfile() {
        return response()->json([
            "status" => 0,
            "msg" => "Acerca del perfil de usuario",
            "data" => auth()->user()
        ]);
    }
    public function logout() {
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => 1,
            "msg" => "Cierre de Sesión",
        ]);
    }
}
