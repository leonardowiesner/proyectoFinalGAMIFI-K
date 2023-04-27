import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RankingAnalysis, RankingService } from 'src/app/services/ranking.service';
import { SoftSkillsService } from 'src/app/services/soft-skills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-soft-skill-evaluation',
  templateUrl: './student-soft-skill-evaluation.component.html',
  styleUrls: ['./student-soft-skill-evaluation.component.css']
})
export class StudentSoftSkillEvaluationComponent implements OnInit {
  evaluationForm: FormGroup;
  rankingAnalises: RankingAnalysis[] = [];
  rankingId: number | null = null;
  currentUserId = this.studentService.student.id // Reemplaza esto con la información del usuario actual (estudiante que realiza la evaluación)
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
    private studentService: StudentService
  ) {
    this.evaluationForm = this.formBuilder.group({
      evaluatedStudentId: ['', [Validators.required, this.selfEvaluationValidator.bind(this)]],
      softSkillId: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
    });
  }

  ngOnInit() {
    console.log("Hola");
    
    this.route.paramMap.subscribe((params) => {
      const rankingIdParam = params.get('rankingId');
      if (rankingIdParam) {
        this.rankingId = +rankingIdParam;
        this.rankingService.getRankingAnalysis( this.rankingId ).subscribe( data =>
          {
            this.rankingAnalises = data;
          } );
          this.students=this.rankingAnalises
          console.log(this.students);
          
      } else {
        // Maneja el caso en el que 'rankingId' no esté presente en la ruta.
        this.router.navigate(['/rankings']);
      }
    });
    
  }

  selfEvaluationValidator(control: AbstractControl): { [key: string]: any } | null {
    // Reemplaza "currentStudentId" con el ID del estudiante actualmente registrado/logueado
    const currentStudentId = 1;

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
        console.error('Error al guardar la evaluación de Soft Skills:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
        const evaluationData = {
            evaluator_student_id: this.currentUserId,
            evaluated_student_id: this.evaluationForm.value.evaluatedStudentId,
            soft_skill: this.evaluationForm.value.softSkillId, // Cambia esta línea
            ranking_analysis_id: this.rankingId,
            points: this.evaluationForm.value.points,
        };
        this.saveSoftSkillEvaluation(evaluationData);
    }
}
}