import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entregas } from '../interfaces/entrgas.interface';

export interface RankingSolo
{
  id: number;
  name: string;
  id_teacher: string;
  cod_room: string;
}

export interface Ranking
{
  id: number;
  name: string;
  id_teacher: string;
  cod_room: string;
  id_student: number;
  points: number;

}

export interface Tarea
{
  id: number;
  name: string; // Cambia 'nombre' a 'name'
  description: string; // Cambia 'descripcion' a 'description'
  points_practice: number | null; // Agrega 'points_practice'
  deadline_practice: Date; // Agrega 'deadline_practice'
}


export interface RankingAnalysis
{
  id: number;
  id_student: number;
  id_rank: number;
  points: number;
  name: string;
}

@Injectable( {
  providedIn: 'root'
} )
export class RankingService
{

  baseUrl: string = "http://127.0.0.1:8000/api"; // URL base del servidor

  token: string = "";
  constructor ( private http: HttpClient )
  {
    window.localStorage.getItem( this.token );

  }
  data: any;

  getRankingsAlumno ( alumnoId: number ): Observable<any>
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };
    // let data={
    //   id:alumnoId
    // };


    return this.http.get<any>( `${ this.baseUrl }/student/get-ranking-studen/${ alumnoId }`, options );
  }

  getPractices ( id_student: number, rankingId: number )
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );

    let options = { headers: headers };

    return this.http.post<any>( `${ this.baseUrl }/student/get-practices`, { id_student, rankingId }, options );
  }

  getRankingsTeacher ( teacherId: number ): Observable<Ranking[]>
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };
    // let data={
    //   id:alumnoId
    // };

    return this.http.get<Ranking[]>( `${ this.baseUrl }/teacher/get-ranking-teacher/${ teacherId }`, options );
  }

  getRanking ( rankingId: number )
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };


    return this.http.get<RankingSolo[]>( `${ this.baseUrl }/student/get-ranking/${ rankingId }`, options );

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

  uploadPracticeFile ( studentId: number, practiceId: number, file: File ): Observable<any>
  {
    const formData = new FormData();
    formData.append( 'id_student', studentId.toString() );
    formData.append( 'id_practice', practiceId.toString() );
    formData.append( 'file', file, file.name );

    return this.http.post<any>( `${ this.baseUrl }/student/uploadPracticeFile`, formData, {
      observe: 'response',
      reportProgress: true,
      responseType: 'json',
    } );
  }
  crearRanking ( name: string, cod_room: string, id_teacher: number )
  {

    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };

    return this.http.post<any>( `${ this.baseUrl }/teacher/create-ranking`, { id_teacher, name, cod_room }, options );
  }

  crearPractice ( name: string, description: string, date_end: Date, id_rank: number )
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };

    return this.http.post<any>( `${ this.baseUrl }/teacher/create-practice`, { name, description, date_end, id_rank }, options );
  }

  deleteRanking ( id_rank: number )
  {


    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };
    //Funcion que sirve para eliminar un ranking mediante la id de ese ranking,
    //tambien se eliminaran todas las columnas que tenga la misma id_rank en la tabla de analisis
    return this.http.get<boolean>( `${ this.baseUrl }/teacher/delete-ranking-id/${ id_rank }`, options );
  }

  deleteStudenRanking ( id_rank: number, id_student: number )
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };

    //elimina un estudiante del ranking

    return this.http.get<boolean>( `${ this.baseUrl }/teacher/delete-studen-ranking-id/${ id_rank }/${ id_student }`, options );
  }

  validarCodigoRanking ( codigoRanking: string ): Observable<boolean>
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };
    return this.http.get<boolean>( `${ this.baseUrl }/rankings/${ codigoRanking }/validar`, options );
  }

  alumnoEnRanking ( alumnoId: number, codigoRanking: string ): Observable<boolean>
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };
    return this.http.get<boolean>( `${ this.baseUrl }/student/${ alumnoId }/rankings/${ codigoRanking }/enranking`, options );
  }

  anadirAlumnoRanking ( id_student: number, cod_room: string, points: number ): Observable<any>
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };
    return this.http.post<any>( `${ this.baseUrl }/student/add-student-ranking-analysis`, { id_student, points, cod_room }, options );
  }


  editarPuntos ( id_student: number, id_rank: number, points: number ): Observable<any>
  {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.token }`
    } );
    let options = { headers: headers };

    return this.http.post<any>( `${ this.baseUrl }/teacher/edit`, { id_student, id_rank, points }, options );

  }

  getPracticesDelivered ( rankingId: number )
  {
    return this.http.get<any>( `${ this.baseUrl }/teacher/get-practices-delivered`, { params: { rankingId } } );

  }


}
