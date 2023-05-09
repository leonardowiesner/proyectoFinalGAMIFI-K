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
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {
  teacher = this.authService.getTeacher();
  student= this.authService.getStudent();
  rankingSolo: RankingSolo[] = [];
  rankingId: number;
  rankingName: String | null;
  rankingAnalises: RankingAnalysis[] = [];
  showPracticasComponent: boolean = false;
  return: any;
  practicas: Tarea[] = [];
  new_points: number;
  name_practica: string;
  tarea: Tarea;
  nuevaTarea: boolean = false;
  selectedFiles: { [practiceId: number]: File } = {};
  practicesDelivered: any[] = [];
  softSkills: string[] = ['emotional', 'thinking', 'responsability', 'cooperation', 'initiative'];

  constructor(  private authService: AuthService,private route: ActivatedRoute, private rankingService: RankingService, private teacherService: TeacherService, private studentService: StudentService) {
    this.rankingId = 0;

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
console.log(this.student);
console.log(this.teacher);
    this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
      this.rankingAnalises = data.map(analysis => {
        const skillsNumber: Map<string, number> = new Map<string, number>([
          ['emotional', analysis.emotional],
          ['thinking', analysis.thinking],
          ['responsability', analysis.responsability],
          ['cooperation', analysis.cooperation],
          ['initiative', analysis.initiative],
        ]);

        const imageUrls: Map<string, string> = new Map<string, string>([
          ['emotional', this.getImageUrl(analysis.emotional)],
          ['thinking', this.getImageUrl(analysis.thinking)],
          ['responsability', this.getImageUrl(analysis.responsability)],
          ['cooperation', this.getImageUrl(analysis.cooperation)],
          ['initiative', this.getImageUrl(analysis.initiative)],
        ]);

        return { ...analysis, imageUrls, skillsNumber };
      });
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




  }

  getImageUrl(points: number): string {
    let rank = 'Bronze';
    if (points >= 1000) {
      rank = 'Plata';
    }
    if (points >= 2000) {
      rank = 'Gold';
    }
    if (points >= 4000) {
      rank = 'Platino';
    }
    if (points >= 7000) {
      rank = 'Diamante';
    }
    if (points >= 10000) {
      rank = 'Challenger';
    }
    return `assets/images/${rank}.png`;
  }

  descriptionSoftSkills(analysis: RankingAnalysis, skill:string) {
    Swal.fire({
      title: skill + "<br>Puntos " + analysis.skillsNumber.get(skill),
      text: this.getDescription(skill),
      imageUrl: analysis.imageUrls.get(skill),
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
    })
  }

  getDescription(name: string) {
    if (name === "emotional") {
      return "Las emociones son reacciones psicofisiológicas que representan modos de adaptación del individuo cuando percibe un objeto, persona, lugar, suceso o recuerdo importante."
    }
    if (name === "thinking") {
      return "En su sentido más común, los términos pensamiento y pensar se refieren a procesos cognitivos conscientes que pueden ocurrir independientemente de la estimulación sensorial. Sus formas más paradigmáticas son el juicio, el razonamiento, la formación de conceptos, la resolución de problemas y la deliberación."
    }
    if (name === "responsability") {
      return "La responsabilidad es un valor que está en la conciencia de la persona que estudia la Ética sobre la base de la moral. Puesto en práctica, se establece la magnitud de dichas acciones y de cómo afrontarlas de la manera más positiva e integral para ayudar en un futuro."
    }
    if (name === "cooperation") {
      return "La cooperación es el resultado de una estrategia aplicada al objetivo, desarrollado por grupos de personas o instituciones que comparten un mismo interés u objetivo. En este proceso generalmente se emplean métodos colaborativos y asociativos que facilitan la consecución de la meta común."
    }
    if (name === "initiative") {
      return "En psicología, la iniciativa es un rasgo de la personalidad que impulsa a un individuo a comenzar algo que ve como necesario, normalmente de cara al ámbito social en el que se mueve. Viene del latín initium, 'principio' y es el ímpetu o el primer paso hacia una acción."
    }
    return "";
  }

  acceptStudent(id_student: number, id_rank: number) {
    this.rankingService.acceptStudent(id_student, id_rank).subscribe((response) => {
      console.log(response.data + "Antes");

      this.practicesDelivered = response.data;


      console.log(response.data + "Despues");
      this.showPracticasComponent = true;

    });
    this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
      this.rankingAnalises = data;
    });
  }

  denegateStudent(id_student: number, id_rank: number) {
    this.rankingService.denegateStudent(id_student, id_rank).subscribe((response) => {
      console.log(response.data + "Antes");

      this.practicesDelivered = response.data;


      console.log(response.data + "Despues");
      this.showPracticasComponent = true;

    });
    this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
      this.rankingAnalises = data;
    });
  }

  verPracticas(id_student: number) {
    this.rankingService.getPracticesDelivered(id_student, this.rankingId).subscribe((response) => {
      console.log(response.data + "Antes");

      this.practicesDelivered = response.data;


      console.log(response.data + "Despues");
      this.showPracticasComponent = true;
    });
  }
  changeCodeRank() {
    const uuid = uuidv4();

    this.rankingService.changeCodeRank(this.rankingId, uuid).subscribe(response => {
      if (response.status === 1) {
        Swal.fire({
          icon: 'success',
          title: 'Código de ranking actualizado',
          text: 'El código del ranking se ha actualizado exitosamente.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el código de ranking',
          text: 'Ocurrió un error al actualizar el código del ranking.',
        });
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el código de ranking',
        text: 'Ocurrió un error al actualizar el código del ranking.',
      });
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
