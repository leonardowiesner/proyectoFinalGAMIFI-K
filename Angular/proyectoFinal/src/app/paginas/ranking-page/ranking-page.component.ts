import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {
  rankingSolo: RankingSolo[] = [];
  rankingId: number;
  rankingName: String | null;
  rankingAnalises: RankingAnalysis[] = [];
  teacher: TeachersData;

  return: any;
  practicas: Tarea[] = [];
  new_points: number;
  name_practica: string;
  tarea: Tarea;
  nuevaTarea: boolean = false;
  selectedFiles: { [practiceId: number]: File } = {};
  practicesDelivered: Entregas[] = [];


  constructor(private route: ActivatedRoute, private rankingService: RankingService, private teacherService: TeacherService, private studentService: StudentService) {
    this.rankingId = 0;
    this.teacher = this.teacherService.teacher;
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





  ngOnInit() {

    this.rankingId = Number(this.route.snapshot.paramMap.get('id'));
    this.rankingName = this.route.snapshot.paramMap.get('name');

    this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
      this.rankingAnalises = data;
    });

    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      const rankingName = params.get('rankingName');
      // ... código para utilizar los valores de id y rankingName en el componente
    });




    this.rankingService.getPractices(this.studentService.student.id, this.rankingId)
      .subscribe(response => {
        console.log("student" + this.studentService.student.id);
        console.log("ID_rank" + this.rankingId);
        if (response.error) {
          console.log(response.error);
          // Puedes manejar errores específicos aquí
        } else if (response.status === 1) {
          console.log(response);
          this.practicas = response.data;
          // Asignar 'response.data' directamente a 'this.practicas'
        } else {
          console.log(response.error);
          //console.error('Error al obtener las tareas pendientes'+response.error);
        }
        console.log(this.practicas);
      });


    if (this.teacher) {
      console.log(this.rankingId);

    }

  }

  verPracticas(id_student:number){

    this.rankingService.getPracticesDelivered(id_student,this.rankingId).subscribe((response) => {
      console.log(response.data + "Antes");

      this.practicesDelivered = response.data;
      console.log(response.data + "Despues");
    });
    
  }

  onFileSelected(event: Event, practiceId: number): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.selectedFiles[practiceId] = file;
    }
  }



  eliminarRegistro(id_rank: number, id_student: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      console.log(id_rank, id_student)
      this.rankingService.deleteStudenRanking(id_rank, id_student).subscribe({
        next: (value: any) => {
          this.return = value
        }
      });
      this.rankingService.getRankingAnalysis(id_rank).subscribe(data => {
        this.rankingAnalises = data;
      });
    }
  }
downloadPracticeFile(id_student: number, id_practice: number): void {
    this.rankingService.downloadPracticeFile(id_student, id_practice).subscribe((file: Blob) => {
      saveAs(file, 'practice_file.pdf');
    });
  }
  uploadFile(practiceId: number): void {
    if (this.selectedFiles[practiceId]) {
      const fileToUpload = this.selectedFiles[practiceId];
      this.rankingService.uploadPracticeFile(this.studentService.student.id, practiceId, fileToUpload)
        .subscribe(response => {
          if (!response.message) {
            Swal.fire({
              icon: 'success',
              title: 'Bien...',
              text: 'Archivo subido correctamente.!',
            })
          } else {
            alert('Error al subir el archivo.');
          }
        }, error => {
          alert('Error al subir el archivo.');
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cuidado...',
        text: 'Por favor, selecciona un archivo para subir.!',
      })
    }
  }

  editarPuntos(id_rank: number, id_student: number, point: number) {
    console.log(point)
    this.rankingService.editarPuntos(id_student, id_rank, point).subscribe(

    );
    this.rankingService.getRankingAnalysis(id_rank).subscribe(data => {
      this.rankingAnalises = data;
    });

  }
  agregarTarea() {
    console.log(this.rankingId);
    this.nuevaTarea = false;
    Swal.fire({
      icon: 'success',
      title: 'Bien...',
      text: 'Tarea agregada al ranking !',
    })
    this.rankingService.crearPractice(this.tarea.name, this.tarea.description, this.tarea.deadline_practice, this.rankingId).subscribe();
  }
}
