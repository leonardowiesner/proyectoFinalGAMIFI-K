<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;
use App\Models\Teacher;

class AuthController extends Controller
{
    protected $JWTAuth;

    public function __construct(JWTAuth $JWTAuth)
    {
        $this->JWTAuth = $JWTAuth;
    }
    public function login(Request $request, JWTAuth $JWTAuth)
    {
        $data = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);
    
        $student = Student::all()
            ->firstWhere("email", $data["email"]);
    
        if ($student && Hash::check($data["password"], $student->password)) {
            try {
                $customClaims = ['user_type' => 'student', 'user_id' => $student->id];
                $token = $JWTAuth->claims($customClaims)->attempt($data, ['exp' => Carbon::now()->addHours(2)->timestamp]);
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }
            return response()->json(compact('token'));
        }
    
        $teacher = Teacher::all()
            ->firstWhere("email", $data["email"]);
    
        if ($teacher && Hash::check($data["password"], $teacher->password)) {
            try {
                $customClaims = ['user_type' => 'teacher', 'user_id' => $teacher->id];
                $token = $JWTAuth->claims($customClaims)->attempt($data, ['exp' => Carbon::now()->addHours(2)->timestamp]);
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }
            return response()->json(compact('token'));
        }
    
        return response()->json([
            "msg" => "Invalid email or password"
        ]);
    }
}