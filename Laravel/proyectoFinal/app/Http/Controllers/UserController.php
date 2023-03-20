<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            "email" => "required",
            "password" => "required"
        ]);

        $user = User::where("email", "=", $request->email)->first();

        if (isset($user->id)) {
            if (Hash::check($request->password, $user->password)) {
                //creamos el token
                $token = $user->createToken("auth_token")->plainTextToken;
                //si está todo ok
                return response()->json([
                    "status" => 1,
                    "msg" => "¡Usuario logueado exitosamente!",
                    "access_token" => $token
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

    public function logout()
    {
        //esto se puede hacer mejor desde angular
        //el token es normal que pete es un error del laravel pero funciona en teoria
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => 1,
            "msg" => "Cerrar session",
        ]);
    }


    public function createTestUsers()
    {
        return '10 test users created!';
    }

    public function addUser(Request $request)
    {
        $user = new User;
        $user->name = $request->input('email');
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
