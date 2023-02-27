import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { RespuestaServidor } from '../interfaces/respuesta-servidor';
import { StudentData } from '../interfaces/alumnos-data.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  user: LoginData = { email: '', password: '' };
  token: string = "";
  apiURL: string = "http://127.0.0.1:8000/api";
  student: StudentData | undefined;

  constructor(
    private http: HttpClient
  ) { }


  login(data: LoginData): Observable<RespuestaServidor> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    console.log(data);
   

    return this.http.post<RespuestaServidor>(`${this.apiURL}/login/student`, data, options);

  }

  changePasword(password: string): Observable<StudentData> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    this.student!.password = password;
    console.log(this.student);
    return this.http.post<StudentData>(`${this.apiURL}/student/${this.student?.id}/change-password`, this.student, options);
  }

  getStudent(id:number): Observable<StudentData> {
    return this.http.get<StudentData>(`${this.apiURL}/student/get/${id}`);
  }
  saveUser(student: StudentData): Observable<any> {
    return this.http.put(`${this.apiURL}/student/update`, student);
  }
  
  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    let options = { headers: headers };

    return this.http.post(`${this.apiURL}/register/student`, data, options);
  }
}
