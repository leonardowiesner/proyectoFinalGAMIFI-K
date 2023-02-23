<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::prefix('register')->group(function () {
    Route::post('/student', [StudentController::class, 'create']);
    Route::post('/teacher', [TeacherController::class, 'create']);
});

Route::prefix('login')->group(function () {
    Route::post('/student', [StudentController::class, 'login']);
    Route::post('/teacher', [TeacherController::class, 'login']);
});

Route::prefix('student')->group(function () {
    Route::get('/all', [StudentController::class, 'all']);
    Route::get('/get', [StudentController::class, 'get']);

    Route::post('/create', [StudentController::class, 'create']);
    Route::put('/update', [StudentController::class, 'update']);

    Route::delete('/delete', [StudentController::class, 'delete']);
});

Route::prefix('teacher')->group(function () {
    Route::get('/all', [TeacherController::class, 'all']);
    Route::get('', [TeacherController::class, 'get']);

    Route::post('register', [TeacherController::class, 'create']);
    Route::put('', [TeacherController::class, 'update']);

    Route::delete('', [TeacherController::class, 'delete']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
});