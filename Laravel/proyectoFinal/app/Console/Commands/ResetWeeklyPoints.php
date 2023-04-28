<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RankingAnalysis;

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
    protected $description = 'Reset weekly points for all students';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $rankingAnalyses = RankingAnalysis::all();

        foreach ($rankingAnalyses as $rankingAnalysis) {
            $rankingAnalysis->weeklyPoints = 1000;
            $rankingAnalysis->save();
        }

        $this->info('Weekly points have been reset successfully.');

        return 0;
    }
}
