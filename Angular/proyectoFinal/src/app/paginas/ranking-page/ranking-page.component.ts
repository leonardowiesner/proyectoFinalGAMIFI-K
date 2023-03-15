import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { TeachersData } from 'src/app/interfaces/profesores-data.interface';
import { TeacherService } from 'src/app/services/teacher.service';
import { Ranking, RankingAnalysis, RankingService, RankingSolo } from 'src/app/services/ranking.service';


@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {
  rankingSolo: RankingSolo[]=[];
  rankingId: number | null;
  rankingAnalises: RankingAnalysis[] = [];
  teacher?:TeachersData;

  constructor(private route: ActivatedRoute,private rankingService: RankingService,private teacherService: TeacherService) {
    this.rankingId=0;
    this.teacher=this.teacherService.teacher;
  }
  
  ngOnInit() {

     this.rankingId = Number(this.route.snapshot.paramMap.get('id'));
    

     this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
       this.rankingAnalises=data;
       console.log(this.rankingAnalises)
            });
  

  }

  eliminarRegistro(id:number){
    
  }
}
