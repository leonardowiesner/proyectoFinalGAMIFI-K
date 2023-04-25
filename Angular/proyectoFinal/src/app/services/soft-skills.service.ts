export interface SoftSkillEvaluation {
  id: number;
  evaluator_student_id: number;
  evaluated_student_id: number;
  // Aquí van los atributos de la evaluación, como las habilidades evaluadas, fechas, etc.
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RankingAnalysis } from './ranking.service';

@Injectable({
  providedIn: 'root'
})
export class SoftSkillsService {
  baseUrl: string = "http://127.0.0.1:8000/api"; // URL base del servidor
  token: string = "";
  constructor(private http: HttpClient) { }

  // Método para guardar una nueva evaluación de Soft Skills
  saveEvaluation(evaluationData: any): Observable<any> {
    const url = `${this.baseUrl}/soft-skills/evaluation`;

    return this.http.post<any>(url, evaluationData);
  }

  getRankingAnalysis ( rankingId: number )
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };



    console.log( `ID RANKING: ${ rankingId }` );


    return this.http.get<RankingAnalysis[]>( `${ this.baseUrl }/student/get-all-ranking-by-id/${ rankingId }`, options );

  }

  // Método para obtener las evaluaciones de Soft Skills de un estudiante
  getEvaluationsByStudent(studentId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    });
    return this.http.get(`${this.baseUrl}/soft-skill-evaluation/student/${studentId}`, { headers });
  }

  // Método para obtener todos los estudiantes
  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }

  // Agrega cualquier otro método necesario para manejar las evaluaciones de Soft Skills
}
