<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RankPractice extends Model
{
    use HasFactory;

    protected $table = 'rank_practices';

    protected $fillable = [
        'name',
        'description',
    ];
}
