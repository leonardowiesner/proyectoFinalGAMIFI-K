<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
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
        return '10 test users created!';
    }

    public function addUser(Request $request)
    {
        $user = new User;
        $user->name = $request->input('name');
        $user->password = bcrypt($request->input('password'));
        $user->rol = $request->input('rol');
        $user->save();

        return response()->json($user);
    }

    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $user = User::find($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
    public function update(Request $request)
    {
        $id = $request->input('id');
        $user = User::find($id);
        $user->name = $request->input('name');
        $user->password = bcrypt($request->input('password'));
        $user->rol = $request->input('rol');
        $user->save();

        return response()->json($user);
    }
}
