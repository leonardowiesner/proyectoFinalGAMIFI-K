<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;
use App\Models\Teacher;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        $student = Student::all()
            ->firstWhere("email", $data["email"]);

        if ($student && Hash::check($data["password"], $student->password)) {
            return $request->user()->createToken('token');
        }

        $teacher = Teacher::all()
            ->firstWhere("email", $data["email"]);

        if ($teacher && Hash::check($data["password"], $teacher->password)) {
            return $request->user()->createToken('token');
        }

        return response()->json([
            "msg" => "Invalid email or password"
        ]);
    }
}
