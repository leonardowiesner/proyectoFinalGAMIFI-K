<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function all()
    {
        return Teacher::all();
    }

    public function get(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|int|gt:0',
        ]);

        $teacher = Teacher::find($data['id']);

        if (!$teacher) {
            // No Content
            return response(status: 204);
        }

        return $teacher;
    }
    public function login(Request $request)
    {
        $data = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);
    }
    public function create(Request $request)
    {

        try{
            $teacher =new Teacher();
        $teacher -> center = $request-> center;
        $teacher -> email = $request-> email;
        $teacher -> name = $request-> name;
        $teacher -> nickname = $request-> nickname;
        $teacher -> password = $request-> password;
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
}