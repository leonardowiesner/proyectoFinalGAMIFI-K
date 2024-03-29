import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Ranking, RankingService } from 'src/app/services/ranking.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeachersData } from 'src/app/interfaces/profesores-data.interface';
import { NavBarService } from 'src/app/services/nav-bar.service';
//SweetAlert2
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {
  teacher = this.authService.getTeacher();
  nombreRanking: string="";
  rankings: Ranking[]=[];
  token:string="";

  constructor(private rankingservice:RankingService,
              private teacherService:TeacherService,
              private readonly navBarService: NavBarService,
              private authService: AuthService
              
              ) {

              navBarService.showNavbar = true;
    }
  ngOnInit(): void {
    console.log(this.teacher.id);
    
//     if(this.teacherService.teacher){
//       this.teacher=this.teacherService.teacher;
//     }
// //     this.teacherService.getTeacher().subscribe(teacher => {
 
// //       //console.log(teacher);
// //       this.teacher = teacher;
// //    this.token = window.localStorage.getItem('authToken') || '';
// // this.teacherService.token = this.token;
  
    
// //     });
    


    this.rankingservice.getRankingsTeacher(this.teacher.id).subscribe({
      next: (rankings: any) => {
        if (rankings !== undefined) {
          this.rankings = rankings.data; // Para imprimir el id del primer ranking de la lista
          console.log(this.rankings);
        } else {
          console.log('No hay rankings disponibles.');
          this.rankings = [];
        }      
      },

    });
    console.log(this.rankings.values);
    console.log(this.teacher.id);
  }
    
  eliminarRegistro(ranking_id:number){
    this.rankingservice.deleteRanking(ranking_id).subscribe();
    this.rankingservice.getRankingsTeacher(this.teacher.id).subscribe({
      next: (rankings: any) => {
        if (rankings !== undefined) {
          this.rankings = rankings.data; // Para imprimir el id del primer ranking de la lista
          console.log(this.rankings);
        } else {
          console.log('No hay rankings disponibles.');
          this.rankings = [];
        }      
      },

    });
    console.log(this.rankings.values);
  }

  onLogoutClick(): void {
    this.authService.logout();
  }

crearRanking(){
  const uuid = uuidv4();
  this.teacherService.getTeacher().subscribe(teacher => {

    console.log(teacher);
    this.teacher = teacher;
    console.log(uuid)

  });
  this.rankingservice.crearRanking(this.nombreRanking,uuid,this.teacher.id).subscribe();
  // if(this.nombreRanking == ""){
  //   Swal.fire({
  //     icon: 'warning',
  //     title: 'Nombre de Ranking vacio !!',
  //     text: 'El nombre de ranking no puede ser nulo!',
  //   })
  // }

  this.rankingservice.getRankingsTeacher(this.teacher.id).subscribe({
    next: (rankings: any) => {
      if (rankings !== undefined) {
        this.rankings = rankings.data; // Para imprimir el id del primer ranking de la lista
        console.log(this.rankings);
      } else {
        console.log('No hay rankings disponibles.');
        this.rankings = [];
      }      
    },

  });
  Swal.fire({
    icon: 'success',
    title: 'Nuevo Ranking !!',
    text: 'El ranking se ha creado correctamente!',
  })
  
}

 
}

