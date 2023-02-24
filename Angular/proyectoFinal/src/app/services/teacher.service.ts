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
  teacher: TeachersData | undefined;

  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginData) : Observable<RespuestaServidor> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    console.log(data);


    return this.http.post<RespuestaServidor>(`${this.apiURL}/login/teacher`, data,options);
  }
  getTeacher(id:number): Observable<TeachersData> {
    return this.http.get<TeachersData>(`${this.apiURL}/teacher/get/${id}`);
  }
  
  saveUser(teacher: TeachersData): Observable<any> {
    return this.http.put(`${this.apiURL}/teacher/update`, teacher);
  }
  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    let options = { headers: headers };

    return this.http.post(`${this.apiURL}/register/teacher`, data, options);
  }
}
