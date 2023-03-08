import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';

import { Ranking, RankingAnalysis, RankingService } from 'src/app/services/ranking.service';


@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {

  rankingId: number | null;
  rankingAnalises!: RankingAnalysis;


  constructor(private route: ActivatedRoute,private rankingService: RankingService) {
    this.rankingId=0;
   }

  ngOnInit() {
     this.rankingId = Number(this.route.snapshot.paramMap.get('id'));
    
     this.rankingService.getRanking(this.rankingId).subscribe(ranking => {
       
      });

  }

}
