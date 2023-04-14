<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\RankPracticeController;
use App\Models\Ranking;
use App\Models\RankPractice;
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

    Route::post('/uploadPracticeFile', [RankPracticeController::class, 'uploadPracticeFile']);

    Route::post('/create', [StudentController::class, 'create']);

    Route::put('/update/{id}', [StudentController::class, 'update']);

    Route::post('/updateimg', [StudentController::class, 'updateimg']);

    Route::get('get-ranking/{id}', [RankingController::class, 'getRankingById']);

    Route::post('/{id}/change-password', [StudentController::class, 'changePassword']);

    Route::post('get-practices', [RankPracticeController::class, 'getPractice']);

    Route::delete('/delete', [StudentController::class, 'delete']);
});

Route::prefix('teacher')->group(function () {

    /* create-practice
    Creamos una nueva practica elementos necesarios que pasarle
            'name' => 'required',
            'description' => 'required',
            "date_end" => "required",
            "id_rank" => "required",
    */
    Route::post('create-practice', [RankPracticeController::class, 'createPractice']);

    //editamos los puntos de la practica del studen, {id_student, id_practice, points_practice}
    Route::post('edit-practice-point', [RankPracticeController::class, 'editPracticePoints']);

    //buscamos todas las practicas donde este este estudiante y el ranking id sea igual al que me pasen{id_student,id_rank}

    //muestra las practicas de los alumnos de ese ranking las cuales estan entregadas al profesor.

    Route::post('get-practices-delivered', [RankPracticeController::class, 'getPracticesDelivered']);

    //editamos la fecha de entrega de un estudiante en espesifico, {'id_student' => 'required','id_practice' => 'required','date_end' => 'required',}
    Route::post('edit-practice-date', [RankPracticeController::class, 'editPracticeDateline']);

    Route::get('delete-ranking-id/{id}', [RankingController::class, 'deleteRanking']);

    Route::post('edit', [RankingController::class, 'editRankingPoints']);

    Route::get('delete-studen-ranking-id/{id_rank}/{id_student}', [RankingController::class, 'deleteStudentRankingAnalysis']);

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
