import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ranking {
  id: number;
  nombre: string;
  idTeacher: string;
  codigo_sala: number;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  baseUrl:string = "http://127.0.0.1:8000/api"; // URL base del servidor

  constructor(private http: HttpClient) {
    
   }
data:any;
  getRankingsAlumno(alumnoId: number): Observable<Ranking[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    let data={
      id:alumnoId
    };

    return this.http.post<Ranking[]>(`${this.baseUrl}/student/rankings`,data,options);
  }

  validarCodigoRanking(codigoRanking: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/rankings/${codigoRanking}/validar`);
  }

  alumnoEnRanking(alumnoId: number, codigoRanking: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/student/${alumnoId}/rankings/${codigoRanking}/enranking`);
  }

  anadirAlumnoRanking(alumnoId: number, codigoRanking: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/student/${alumnoId}/rankings`, { codigoRanking });
  }

}
