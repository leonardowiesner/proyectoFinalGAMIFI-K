<?php
// app/Models/SoftSkillEvaluation.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoftSkillEvaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'evaluator_student_id',
        'evaluated_student_id',
        'ranking_analysis_id',
        'points',
        'week_start_date',
    ];

    public function evaluator_student()
    {
        return $this->belongsTo(Student::class, 'evaluator_student_id');
    }

    public function evaluated_student()
    {
        return $this->belongsTo(Student::class, 'evaluated_student_id');
    }

    public function ranking_analysis()
    {
        return $this->belongsTo(RankingAnalysis::class);
    }
}
