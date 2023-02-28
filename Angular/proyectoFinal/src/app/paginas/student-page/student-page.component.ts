import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { Ranking, RankingService } from 'src/app/services/ranking.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  rankings: Ranking[] = []; // Lista de rankings matriculados por el alumno
  nuevoCodigoRanking: string = ''; // Código del nuevo ranking al que unirse
  mensajeNoRankings: string = 'No estás matriculado en ningún ranking.'; // Mensaje a mostrar si el alumno no tiene rankings
  mensajeRankings: string = 'Estás matriculado en los siguientes rankings:'; // Mensaje a mostrar si el alumno tiene rankings
  id:number | undefined;

  constructor(private rankingService: RankingService, private studentService: StudentService) { }

  ngOnInit(): void {
    // Obtenemos la lista de rankings matriculados por el alumno
    // Suponemos que el alumno está logueado y su ID es 1
    this.id= this.studentService.student?.id
    this.rankingService.getRankingsAlumno(1).subscribe(
      rankings => {
        this.rankings = rankings;
      }
    );
  }

  unirseRanking(): void {
    // Comprobamos si el código de ranking introducido es válido
    // Suponemos que el método devuelve un Observable que emite true si el código es válido y false si no lo es
    this.rankingService.validarCodigoRanking(this.nuevoCodigoRanking).subscribe(
      valido => {
        if (valido) {
          // Comprobamos si el alumno ya está matriculado en el ranking
          // Suponemos que el método devuelve un Observable que emite true si el alumno está matriculado y false si no lo está
          this.rankingService.alumnoEnRanking(1, this.nuevoCodigoRanking).subscribe(
            enRanking => {
              if (!enRanking) {
                // Si el alumno no está matriculado, lo añadimos al ranking
                this.rankingService.anadirAlumnoRanking(1, this.nuevoCodigoRanking).subscribe(
                  () => {
                    // Actualizamos la lista de rankings matriculados
                    this.rankingService.getRankingsAlumno(1).subscribe(
                      rankings => {
                        this.rankings = rankings;
                      }
                    );
                  }
                );
              }
            }
          );
        }
      }
    );
  }

}