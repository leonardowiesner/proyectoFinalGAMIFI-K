<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RankingAnalysis extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_student',
        'id_rank',
        'points',
        'weeklyPoints',
        'week_start_date',
        'emotional',
        'thinking',
        'responsability',
        'cooperation',
        'initiative',
        'accepted',
    ];

    /**
     * Get the student associated with the ranking analysis.
     */
    public function student()
    {
        return $this->belongsTo(Student::class, 'id_student');
    }

    /**
     * Get the ranking associated with the ranking analysis.
     */
    public function ranking()
    {
        return $this->belongsTo(Ranking::class, 'id_rank');
    }

    // Agrega aquí más relaciones o métodos personalizados si los necesitas
}
