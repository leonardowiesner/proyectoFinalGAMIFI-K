<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\RankingController;
use App\Models\Ranking;
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
    Route::get('get-ranking-studen/{id}', [RankingController::class, 'getRankingByStuden']);
    Route::get('get-all-ranking-by-id/{id}', [RankingController::class, 'getRankingAnalysesByRankId']);
    Route::post('add-student-ranking-analysis', [RankingController::class, 'addStudentToRanking']);
    Route::get('/get/{id}', [StudentController::class, 'get']);
    Route::post('/rankings', [RankingController::class, 'getRanking']);
    Route::post('/create', [StudentController::class, 'create']);
    Route::post('/update', [StudentController::class, 'update']);
    Route::post('/updateimg', [StudentController::class, 'updateimg']);
    Route::get('get-ranking/{id}', [RankingController::class, 'getRankingById']);
    Route::post('/{id}/change-password', [StudentController::class, 'changePassword']);

    Route::delete('/delete', [StudentController::class, 'delete']);
});

Route::prefix('teacher')->group(function () {
    Route::get('delete-ranking-id/{id}', [RankingController::class, 'deleteRanking']);
    Route::get('delete-studen-ranking-id/{id}', [RankingController::class, 'deleteStudenRanking']);
    Route::post('create-ranking', [RankingController::class, 'createRanking']);
    Route::get('get-all-ranking-by-id/{id}', [RankingController::class, 'getRankingAnalysesByRankId']);
    Route::get('get-ranking-teacher/{id}', [RankingController::class, 'getRankingByTeacher']);
    Route::get('/all', [TeacherController::class, 'all']);
    Route::get('/get/{id}', [TeacherController::class, 'get']);
    Route::post('register', [TeacherController::class, 'create']);
    Route::post('', [TeacherController::class, 'update']);
    Route::post('/updateimg', [TeacherController::class, 'updateimg']);
    Route::get('get-ranking/{id}', [RankingController::class, 'getRankingById']);

    Route::delete('', [TeacherController::class, 'delete']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());
});
