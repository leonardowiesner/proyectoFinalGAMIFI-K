<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PracticeInfo extends Model
{
    use HasFactory;

    protected $table = 'practice_info';

    protected $fillable = [
        'id_student',
        'id_practice',
        'points_practice',
        'name_file',
        'deadline_practice', 
    ];
}