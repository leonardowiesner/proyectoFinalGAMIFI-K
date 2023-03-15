import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RankingSolo {
  id: number;
  name: string;
  id_teacher: string;
  cod_room:string;
}

export interface Ranking {
  id: number;
  name: string;
  id_teacher: string;
  cod_room:string;
  id_student:number;
  points:number;

}

export interface RankingAnalysis {
  id: number ;
  id_student:number;
  id_rank:number;
  points:number;
  name:string;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  baseUrl:string = "http://127.0.0.1:8000/api"; // URL base del servidor

  constructor(private http: HttpClient) {
    
   }
data:any;
  getRankingsAlumno(alumnoId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    // let data={
    //   id:alumnoId
    // };

    
    return this.http.get<any>(`${this.baseUrl}/student/get-ranking-studen/${alumnoId}`,options);
  }


  getRankingsTeacher(teacherId: number): Observable<Ranking[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    // let data={
    //   id:alumnoId
    // };

    return this.http.get<Ranking[]>(`${this.baseUrl}/teacher/get-ranking-teacher/${teacherId}`,options);
  }

  getRanking(rankingId:number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };


    return this.http.get<RankingSolo[]>(`${this.baseUrl}/student/get-ranking/${rankingId}`,options);

  }

  getRankingAnalysis(rankingId:number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };


    console.log(`ID RANKING: ${rankingId}`);
    
    return this.http.get<RankingAnalysis[]>(`${this.baseUrl}/student/get-all-ranking-by-id/${rankingId}`, options);

  }

  crearRanking(name:string,cod_room:string,id_teacher:number){
    

    return this.http.post<any>(`${this.baseUrl}/teacher/create-ranking`, { id_teacher,name,cod_room });
  }

  deleteRanking(id_rank:number){
    //Funcion que sirve para eliminar un ranking mediante la id de ese ranking, 
    //tambien se eliminaran todas las columnas que tenga la misma id_rank en la tabla de analisis
    return this.http.get<boolean>(`${this.baseUrl}/teacher/delete-ranking-id/${id_rank}`);
  }
  deleteStudenRanking(id_student:number){
    //elimina un estudiante del ranking 
    return this.http.get<boolean>(`${this.baseUrl}/teacher/delete-ranking-id/${id_student}`);
  }

  validarCodigoRanking(codigoRanking: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/rankings/${codigoRanking}/validar`);
  }

  alumnoEnRanking(alumnoId: number, codigoRanking: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/student/${alumnoId}/rankings/${codigoRanking}/enranking`);
  }

  anadirAlumnoRanking(id_student: number, cod_room: string, points:number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/student/add-student-ranking-analysis`, { id_student,points,cod_room });
  }

}
