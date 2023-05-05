import { Component, OnInit } from '@angular/core';
import { Historial, SoftSkillsService } from 'src/app/services/soft-skills.service';
import { ActivatedRoute } from '@angular/router';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { TeachersData } from 'src/app/interfaces/profesores-data.interface';
import { TeacherService } from 'src/app/services/teacher.service';
import { Ranking, RankingAnalysis, RankingService, RankingSolo, Tarea } from 'src/app/services/ranking.service';
import { StudentService } from 'src/app/services/student.service';
import { Entregas } from 'src/app/interfaces/entrgas.interface';
//SweetAlert2
import { saveAs } from 'file-saver'; // Agrega esta línea
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-history-skills',
  templateUrl: './history-skills.component.html',
  styleUrls: ['./history-skills.component.css']
})
export class HistorySkillsComponent implements OnInit {
  rankingSolo: RankingSolo[] = [];
  rankingId: number;
  rankingName: String | null;
  rankingAnalises: RankingAnalysis[] = [];
  teacher: TeachersData;
  student: StudentData;
  showPracticasComponent: boolean = false;
  return: any;
  practicas: Tarea[] = [];
  historial: Historial[] = [];
  new_points: number;
  name_practica: string;
  tarea: Tarea;
  nuevaTarea: boolean = false;
  selectedFiles: { [practiceId: number]: File } = {};
  practicesDelivered: any[] = [];
  softSkills: string[] = ['emotional', 'thinking', 'responsability', 'cooperation', 'initiative'];

  constructor(private softSkillsService: SoftSkillsService, private route: ActivatedRoute, private rankingService: RankingService, private teacherService: TeacherService, private studentService: StudentService) {
    this.rankingId = 0;
    this.teacher = this.teacherService.teacher;
    this.student = this.studentService.student;
    this.new_points = 0;
    this.rankingName = "";
    this.name_practica = "";
    this.tarea = {
      id: 0,
      name: "",
      description: "",
      points_practice: 0,
      deadline_practice: new Date()
    }

  }
  ngOnInit(): void {
    this.rankingId = Number(this.route.snapshot.paramMap.get('id'));

    console.log("Historial ID_rank" + this.rankingId);
    this.softSkillsService.getHistorial(this.rankingId)
      .subscribe(response => {
        console.log(response.msg);
        if (response.error) {
          console.log(response.error);
          // Puedes manejar errores específicos aquí
        } else if (response.status === 1) {
          console.log(response);
          this.historial = response.data;
          // Asignar 'response.data' directamente a 'this.practicas'
        } else {
          console.log(response.error);
          //console.error('Error al obtener las tareas pendientes'+response.error);
        }
        console.log(this.historial);
      });
  }

  filteredByStudentEvaluator(id_student: number) {
    this.softSkillsService.getHistorialEvaluator(this.rankingId, id_student).subscribe((response) => {
      console.log(response.msg);
      if (response.error) {
        console.log(response.error);
        // Puedes manejar errores específicos aquí
      } else if (response.status === 1) {
        console.log(response);
        this.historial = response.data;
        // Asignar 'response.data' directamente a 'this.practicas'
      } else {
        console.log(response.error);
        //console.error('Error al obtener las tareas pendientes'+response.error);
      }
      console.log(this.historial);
    });
  }

  deleteStudentEvaluation(id: number) {
    this.softSkillsService.deleteStudentEvaluation(id).subscribe((response) => {
      console.log(response.message);
      this.softSkillsService.getHistorial(this.rankingId)
        .subscribe(response => {
          console.log(response.msg);
          if (response.error) {
            console.log(response.error);
            // Puedes manejar errores específicos aquí
          } else if (response.status === 1) {
            console.log(response);
            this.historial = response.data;
            // Asignar 'response.data' directamente a 'this.practicas'
          } else {
            console.log(response.error);
            //console.error('Error al obtener las tareas pendientes'+response.error);
          }
          console.log(this.historial);
        });
    });
  }

}

