import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ranking {
  idUser: number;
  codeRanking: string;
  nombre: string;
  codigo_sala: string;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  baseUrl:string = "http://127.0.0.1:8000/api"; // URL base del servidor

  constructor(private http: HttpClient) { }

  getRankingsAlumno(alumnoId: number): Observable<Ranking[]> {

    return this.http.get<Ranking[]>(`${this.baseUrl}/student/${alumnoId}/rankings`);
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