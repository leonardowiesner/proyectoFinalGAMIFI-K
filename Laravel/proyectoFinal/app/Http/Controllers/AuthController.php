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
    
        $student = Student::all()->firstWhere("email", $data["email"]);
       
        if ($student && Hash::check($data["password"], $student->password)) {
            $token = $student->createToken('student_token')->plainTextToken;
            return response()->json(compact('token'));
        }
    
        $teacher = Teacher::all()->firstWhere("email", $data["email"]);
    
        if ($teacher && Hash::check($data["password"], $teacher->password)) {
            $token = $teacher->createToken('teacher_token')->plainTextToken;
            return response()->json(compact('token'));
        }
    
        return response()->json([
            "msg" => "Invalid email or password"
        ]);
    }
}