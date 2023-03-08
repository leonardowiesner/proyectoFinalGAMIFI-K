import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { Ranking, RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {
  rankingId: string | null;
  ranking!: Ranking;
  students!: StudentData[];

  constructor(private route: ActivatedRoute) {
    this.rankingId="";
   }

  ngOnInit() {
    this.rankingId = this.route.snapshot.paramMap.get('id');
    
    // this.rankingService.getRanking(this.rankingId).subscribe(ranking => {
    //   this.ranking = ranking;
    //   this.students = ranking.students;
    // });
  }

}
