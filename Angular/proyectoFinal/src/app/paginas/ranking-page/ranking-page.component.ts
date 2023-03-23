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
  rankingId: number;
  rankingName:String | null;
  rankingAnalises: RankingAnalysis[] = [];
  teacher:TeachersData;
  return:any;
  new_points:number;
  name_practica:string;
  tarea:Tarea;
  nuevaTarea: boolean = false;
  

  constructor(private route: ActivatedRoute,private rankingService: RankingService,private teacherService: TeacherService) {
    this.rankingId=0;
    this.teacher=this.teacherService.teacher;
    this.new_points=0;
    this.rankingName="";
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
     this.rankingName = this.route.snapshot.paramMap.get('name');

     this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
       this.rankingAnalises=data;
            });
            
      this.route.queryParamMap.subscribe(params => {
              const id = params.get('id');
              const rankingName = params.get('rankingName');
              // ... código para utilizar los valores de id y rankingName en el componente
            });
      
console.log(this.rankingSolo[1]);


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
    console.log(this.rankingId);
    this.rankingService.crearPractice(this.tarea.nombre,this.tarea.descripcion,this.tarea.fechaEntrega,this.rankingId).subscribe();
  }
}
