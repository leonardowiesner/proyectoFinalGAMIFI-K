import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RankingAnalysis, RankingService } from 'src/app/services/ranking.service';
import { SoftSkillsService } from 'src/app/services/soft-skills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-soft-skill-evaluation',
  templateUrl: './student-soft-skill-evaluation.component.html',
  styleUrls: ['./student-soft-skill-evaluation.component.css']
})
export class StudentSoftSkillEvaluationComponent implements OnInit {
  currentStudentWeeklyPoints = 1000; // Reemplaza esto con la cantidad real de 'weeklyPoints' del estudiante actual
  evaluationForm: FormGroup;
  rankingAnalises: RankingAnalysis[] = [];
  rankingId: number | null = null;
  currentUserId = this.authService.getStudent();// Reemplaza esto con la información del usuario actual (estudiante que realiza la evaluación)
  students = [
    { id: 1, name: 'Estudiante 1' },
    { id: 2, name: 'Estudiante 2' },
    { id: 3, name: 'Estudiante 3' },
  ];

  softSkills = [
    { realname: "emotional", name: 'Emocional' },
    { realname: "thinking", name: 'Pensamiento' },
    { realname: "responsability", name: 'Responsabilidad' },
    { realname: "cooperation", name: 'Cooperacion' },
    { realname: "initiative", name: 'Iniciativa' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private rankingService: RankingService,
    private softSkillsService: SoftSkillsService,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private authService: AuthService
  ) {
    this.evaluationForm = this.formBuilder.group({
      evaluatedStudentId: ['', [Validators.required, this.selfEvaluationValidator.bind(this)]],
      softSkillId: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(1), Validators.max(1000), this.pointsValidator.bind(this)]],
    });
  }

  ngOnInit() {
    console.log("Hola");

    this.route.paramMap.subscribe((params) => {
      const rankingIdParam = params.get('rankingId');
      if (rankingIdParam) {
        this.rankingId = +rankingIdParam;
        this.rankingService.getRankingAnalysis(this.rankingId).subscribe(data => {
          this.rankingAnalises = data;
        });
        this.students = this.rankingAnalises
        console.log(this.students);

      } else {
        // Maneja el caso en el que 'rankingId' no esté presente en la ruta.
        this.router.navigate(['/rankings']);
      }
    });

  }

  pointsValidator(control: AbstractControl): ValidationErrors | null {
    const points = control.value;
    console.log('Current student weekly points:', this.currentStudentWeeklyPoints);
    if (points > this.currentStudentWeeklyPoints) {
      return { pointsExceeded: { value: points } };
    }
    return null;
  }

  selfEvaluationValidator(control: AbstractControl): { [key: string]: any } | null {
    // Reemplaza "currentStudentId" con el ID del estudiante actualmente registrado/logueado
    const currentStudentId = this.currentUserId.id;

    if (control.value == currentStudentId) {
      return { selfEvaluation: { value: control.value } };
    }
    return null;
  }

  saveSoftSkillEvaluation(evaluationData: any) {
    this.softSkillsService.saveEvaluation(evaluationData).subscribe(
      (response: any) => {
        console.log('Evaluación de Soft Skills guardada con éxito:', response);
        // Redirigir a una página de éxito o actualizar la vista según sea necesario
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la habilidad',
          text: 'Ocurrió un error al modificar los puntos comprobe que todos los datos son correctos.',
        });
        console.error('Error al guardar la evaluación de Soft Skills:', error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.evaluationForm.value.softSkillId);
    console.log("Formulario válido:", this.evaluationForm.valid);
    console.log("Formulario valor:", this.evaluationForm.value);

    if (this.evaluationForm.valid) {
      console.log(this.evaluationForm.value.softSkillId);
      const evaluationData = {
        evaluator_student_id: this.currentUserId.id,
        evaluated_student_id: this.evaluationForm.value.evaluatedStudentId,
        soft_skill: this.evaluationForm.value.softSkillId, // Aquí ya debería ser una cadena
        ranking_analysis_id: this.rankingId,
        points: this.evaluationForm.value.points,
      };
      console.log("Datos de evaluación:", evaluationData);
      this.saveSoftSkillEvaluation(evaluationData);
    }
  }
}