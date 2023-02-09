<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class StudentController extends Controller
{
    public function login(Request $request)
    
    {
        $credentials = $request->only('name', 'password');
//porfa funciona
        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return response()->json(['status' => 'success'], 200);
        }else{
            return response()->json(['status' => 'error'], 401);
        }
    }
    
    public function createTestUsers()
    {
        return '10 test students created!';
    }

    public function addStudent(Request $request)
    {
        $student = new Student();
        $student->name = $request->input('name');
        $student->password = bcrypt($request->input('password'));
        $student->save();

        return response()->json($student);
    }

    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $student = Student::find($id);
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
    public function update(Request $request)
    {
        $id = $request->input('id');
        $student = Student::find($id);
        $student->name = $request->input('name');
        $student->password = bcrypt($request->input('password'));
        $student->save();

        return response()->json($student);
    }
}
