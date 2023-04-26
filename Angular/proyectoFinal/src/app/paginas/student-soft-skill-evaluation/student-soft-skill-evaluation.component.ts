import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RankingAnalysis, RankingService } from 'src/app/services/ranking.service';
import { SoftSkillsService } from 'src/app/services/soft-skills.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-soft-skill-evaluation',
  templateUrl: './student-soft-skill-evaluation.component.html',
  styleUrls: ['./student-soft-skill-evaluation.component.css']
})
export class StudentSoftSkillEvaluationComponent implements OnInit {
  evaluationForm: FormGroup;
  rankingAnalises: RankingAnalysis[] = [];
  rankingId: number | null = null;
  currentUser = { id: 1 }; // Reemplaza esto con la información del usuario actual (estudiante que realiza la evaluación)
  students = [
    { id: 1, name: 'Estudiante 1' },
    { id: 2, name: 'Estudiante 2' },
    { id: 3, name: 'Estudiante 3' },
  ];

  softSkills = [
    { id: 1, name: 'Emocional' },
    { id: 2, name: 'Pensamiento' },
    { id: 3, name: 'Responsabilidad' },
    { id: 2, name: 'Cooperacion' },
    { id: 3, name: 'Iniciativa' },

  ];
 constructor(
    private formBuilder: FormBuilder,
    private rankingService: RankingService,
    private softSkillsService: SoftSkillsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.evaluationForm = this.formBuilder.group({
      evaluatedStudentId: ['', [Validators.required, this.selfEvaluationValidator.bind(this)]],
      softSkillId: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const rankingIdParam = params.get('rankingId');
      if (rankingIdParam) {
        this.rankingId = +rankingIdParam;
        this.rankingService.getRankingAnalysis( this.rankingId ).subscribe( data =>
          {
            this.rankingAnalises = data;
          } );
          this.students=this.rankingAnalises

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

  saveSoftSkillEvaluation() {
    const evaluationData = {
      id: 0,
      name: '1',
    };

    this.softSkillsService.saveEvaluation(evaluationData).subscribe(
      (response: any) => {
        console.log('Evaluación de Soft Skills guardada con éxito:', response);
      },
      (error: any) => {
        console.error('Error al guardar la evaluación de Soft Skills:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
      // Llamar al servicio para guardar la evaluación
    }
  }
}