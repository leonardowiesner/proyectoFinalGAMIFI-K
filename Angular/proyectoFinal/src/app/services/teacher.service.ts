import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { TeachersData } from '../interfaces/profesores-data.interface';
import { RespuestaServidor } from '../interfaces/respuesta-servidor';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  user: LoginData = { email: '', password: '' };
  token: string = "";
  apiURL: string = "http://127.0.0.1:8000/api";
  teacher: TeachersData;

  constructor(
    private http: HttpClient
  ) { 
    this.teacher = new TeachersData(
      0,"","","","","","",""
    );
    window.localStorage.getItem(this.token);
      
      
  }

  login(data: LoginData) : Observable<RespuestaServidor> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    console.log(data);


    return this.http.post<RespuestaServidor>(`${this.apiURL}/login/teacher`, data,options);
  }

  updatePicture(id_teacher: number, img: File): Observable<any> {
    const formData = new FormData();
    formData.append('id_teacher', id_teacher.toString());
    formData.append('img', img, img.name);

    const options = {
      observe: 'response' as const,
      reportProgress: true,
      responseType: 'json' as const
    };

    return this.http.post<any>(`${this.apiURL}/teacher/update-picture`, formData, options);
  }

  getTeacher(): Observable<TeachersData> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    let options = { headers: headers };
    return this.http.get<TeachersData>(`${this.apiURL}/teacher/get/${this.teacher?.id}`,options);
  }
  
  saveUser(teacher: TeachersData): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    let options = { headers: headers };

    return this.http.put(`${this.apiURL}/teacher/update`, teacher,options);
  }
  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    
    let options = { headers: headers };

    return this.http.post(`${this.apiURL}/register/teacher`, data, options);
  }
}
