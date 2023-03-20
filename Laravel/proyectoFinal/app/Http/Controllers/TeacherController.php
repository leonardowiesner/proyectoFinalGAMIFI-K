<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            "email" => "required",
            "password" => "required"
        ]);

        $teacher = Teacher::where("email", "=", $request->email)->first();

        if (isset($teacher->id)) {
            if (Hash::check($request->password, $teacher->password)) {
                //creamos el token
                $token = $teacher->createToken("auth_token")->plainTextToken;
                //si está todo ok
                
                return response()->json([
                    "status" => 1,
                    "msg" => "¡Usuario logueado exitosamente!",
                    "token" => $token,
                    "teacher" => $teacher
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "La password es incorrecta",
                ], 404);
            }
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no registrado",
            ], 404);
        }
    }

    public function all()
    {
        return Teacher::all();
    }

    public function get($id)
    {
        
        $teacher = Teacher::find($id);

        if (!$teacher) {
            // No Content
            return response(status: 204);
        }

        return $teacher;
    }
    
    public function create(Request $request)
    {

        try{
            $teacher =new Teacher();
        $teacher -> center = $request-> center;
        $teacher -> email = $request-> email;
        $teacher -> name = $request-> name;
        $teacher -> nickname = $request-> nickname;
        $teacher -> password = Hash::make($request-> password);
        $teacher -> surnames = $request-> surnames;
        $teacher -> save();
        } catch(Exception $e){
            return response(status: 400);

        }

        // Created
        return response()->json([
            'teacher' => $teacher
        ], 200);
    }

    public function update(Request $request)
    {
        $teacher = Teacher::updateFromRequest($request);

        if (empty($teacher)) {
            // No Content
            return response(status: 204);
        }

        return response($teacher);
    }

    public function delete(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|int|gt:0'
        ]);

        $teacher = Teacher::find($data['id']);

        if (!$teacher) {
            // No Content
            return response(status: 204);
        }

        return response(
            status: $teacher->delete() ? 200 : 204
        );
    }
    // Actualizar imagen 
    public function updateimg(Request $request)
    {
        $student = Teacher::find($request->id);
        $student->img = $request->img;
        $student->save();

        if (empty($Teacher)) {
            return response(status: 204);
        }

        return response($Teacher);
    }
}