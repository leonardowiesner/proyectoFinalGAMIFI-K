import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { Ranking, RankingAnalysis, RankingService } from 'src/app/services/ranking.service';
import { StudentService } from 'src/app/services/student.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  images: string[] = [];
  rankings: Ranking[] = [];
  token:string="";
  student = this.authService.getStudent();
  // Lista de rankings matriculados por el alumno
  nuevoCodigoRanking: string = ''; // Código del nuevo ranking al que unirse
  mensajeNoRankings: string = 'Ups! Parece que no estás matriculado en ningún ranking.'; // Mensaje a mostrar si el alumno no tiene rankings
  //mensajeRankings: string = 'Estás matriculado en los siguientes rankings:'; // Mensaje a mostrar si el alumno tiene rankings
  id = this.student.id;
  points: number = 0;
  constructor(private rankingService: RankingService,
              private studentService: StudentService,
              private router: Router,
              private readonly navBarService: NavBarService,
              private authService: AuthService
              ) {
    // this.rankings = [];
              navBarService.showNavbar = true;
              this.token = window.localStorage.getItem('authToken') || '';
  }
  verRanking(id: number) {
    this.router.navigate(['/ranking', id]);
    
  }

  ngOnInit(): void {
    
  this.images = ["https://i.imgur.com/r7Oo9k5.png", "https://i.imgur.com/KM2IcKo.png",
  "https://i.imgur.com/vbahFut.png","https://i.imgur.com/DLxq3AY.png","https://i.imgur.com/MKnwHsy.png","https://i.imgur.com/k6slzA2.png","https://i.imgur.com/4Ujc7UH.png","https://i.imgur.com/uTDjkfa.png"];
  // Obtenemos la lista de rankings matriculados por el alumno
  this.rankingService.getRankingsAlumno(this.id).subscribe({
    next: (rankings: {data: Ranking[]}) => {
      if (rankings !== undefined) {
        this.rankings = rankings.data.filter((ranking: Ranking) => ranking.accepted == 1);
        console.log(rankings); // Para imprimir el id del primer ranking de la lista
        this.rankings.forEach(ranking => {
          let autoExclude: number[] = [];
          let randomNumber: number = Math.floor(Math.random() * this.images.length);
          while (autoExclude.includes(randomNumber)) { randomNumber = Math.floor(Math.random() * this.images.length); }
          ranking.image = this.images[randomNumber];
        });
      } else {
        console.log('No hay rankings disponibles.');
        this.rankings = [];
      }

      this.token = window.localStorage.getItem('authToken') || '';
      this.studentService.token = this.token;
    },
    error: (error: any) => {
      console.log('Error al obtener los rankings: ', error);
      console.log(this.rankings[0].id);
      this.rankings = [];
    }
  });
}
onLogoutClick(): void {
  this.authService.logout();
}

  unirseRanking(): void {
    // Comprobamos si el código de ranking introducido es válido
    // Suponemos que el método devuelve un Observable que emite true si el código es válido y false si no lo es
    // this.rankingService.validarCodigoRanking(this.nuevoCodigoRanking).subscribe(
    //   valido => {
    //     if (valido) {
          // Comprobamos si el alumno ya está matriculado en el ranking
          // Suponemos que el método devuelve un Observable que emite true si el alumno está matriculado y false si no lo está
          // this.rankingService.alumnoEnRanking(this.id, this.nuevoCodigoRanking).subscribe(
          //   enRanking => {
          //     if (!enRanking) {
                // Si el alumno no está matriculado, lo añadimos al ranking
                this.rankingService.getRankingsAlumno(this.id).subscribe({
                  next: (rankings: {data: Ranking[]}) => {
                    if (rankings !== undefined) {
                      this.rankings = rankings.data.filter((ranking: Ranking) => ranking.accepted == 1);
                      console.log(rankings); // Para imprimir el id del primer ranking de la lista
                      this.rankings.forEach(ranking => {
                        let autoExclude: number[] = [];
                        let randomNumber: number = Math.floor(Math.random() * this.images.length);
                        while (autoExclude.includes(randomNumber)) { randomNumber = Math.floor(Math.random() * this.images.length); }
                        ranking.image = this.images[randomNumber];
                      });
                    } else {
                      console.log('No hay rankings disponibles.');
                      this.rankings = [];
                    }
                  },
                  error: (error: any) => {
                    console.log('Error al obtener los rankings: ', error);
                    console.log(this.rankings[0].id);
                    this.rankings = [];
                  }
                });
              }
        //     }
        //   );
        // }
  //     }
  //   );
  // }

}