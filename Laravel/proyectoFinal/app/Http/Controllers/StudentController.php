<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function all()
    {
        return Student::all();
    }

    public function get(Request $request)
    {
        $data = $request->validate([
            "id" => "required|int|gt:0",
        ]);

        $student = Student::find($data["id"]);

        if (!$student) {
            // No Content
            return response(status: 204);
        }

        return $student;
    }

    public function create(Request $request)
    {
        $student =new Student();
        $student -> birth_date = $request-> birth_date;
        $student -> email = $request-> email;
        $student -> name = $request-> name;
        $student -> nickname = $request-> nickname;
        $student -> password = $request-> password;
        $student -> surnames = $request-> surnames;
        $student -> save();


        // Created
        return response(status: 201);
    }

    public function update(Request $request)
    {
        $student = Student::updateFromRequest($request);

        if (empty($student)) {
            // No Content
            return response(status: 204);
        }

        return response($student);
    }

    public function delete(Request $request)
    {
        $data = $request->validate([
            "id" => "required|int|gt:0"
        ]);

        $student = Student::find($data["id"]);

        if (!$student) {
            // No Content
            return response(status: 204);
        }

        return response(
            status: $student->delete() ? 200 : 204
        );
    }
}