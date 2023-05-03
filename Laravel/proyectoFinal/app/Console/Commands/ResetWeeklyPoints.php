<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetWeeklyPoints extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reset:weekly-points';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset the weekly points for all students in ranking_analyses table';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        DB::table('ranking_analyses')->update(['weeklyPoints' => 1000]);
        $this->info('Weekly points have been reset to 1000 for all students.');

        return 0;
    }
}
