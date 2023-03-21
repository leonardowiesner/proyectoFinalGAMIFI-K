import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { TeachersData } from 'src/app/interfaces/profesores-data.interface';
import { TeacherService } from 'src/app/services/teacher.service';
import { Ranking, RankingAnalysis, RankingService, RankingSolo, Tarea } from 'src/app/services/ranking.service';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {
  rankingSolo: RankingSolo[]=[];
  rankingId?: number | null;
  rankingAnalises: RankingAnalysis[] = [];
  teacher?:TeachersData;
  return:any;
  new_points:number;
  name_practica:string;
  tarea:Tarea;
  nuevaTarea: boolean = false;
  

  constructor(private route: ActivatedRoute,private rankingService: RankingService,private teacherService: TeacherService) {
    this.rankingId=0;
    this.teacher=this.teacherService.teacher;
    this.new_points=0;
    this.name_practica="";
    this.tarea = {
      id: 0,
      nombre: "",
      descripcion: "",
      id_teacher: 0,
      fechaEntrega: new Date()
    }
  }
  



  
  ngOnInit() {

     this.rankingId = Number(this.route.snapshot.paramMap.get('id'));
    

     this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
       this.rankingAnalises=data;
       console.log(this.rankingAnalises)
            });
      console.log(this.teacher);
      

  }

  eliminarRegistro(id_rank:number,id_student:number){
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      console.log(id_rank,id_student)
      this.rankingService.deleteStudenRanking(id_rank,id_student).subscribe({
        next: (value:any)=>{
          this.return=value
        }
      });
      this.rankingService.getRankingAnalysis(id_rank).subscribe(data => {
        this.rankingAnalises=data;
      });
    }
  }

  nuevaPractica(){

  }

  editarPuntos(id_rank:number,id_student:number,point:number){
    console.log(point)
   this.rankingService.editPointStuden(id_student,id_rank,point).subscribe(
   
   );
   this.rankingService.getRankingAnalysis(id_rank).subscribe(data => {
    this.rankingAnalises=data;
  });

  }
  agregarTarea(){
    console.log(this.tarea);
    
  }
}
