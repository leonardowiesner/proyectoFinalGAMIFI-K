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
  student: StudentData ;

  constructor(
    private http: HttpClient,

  ) { 
    this.student = new StudentData(
      0,"","","","","","",new Date
    );
    window.localStorage.getItem(this.token);
  }


  login(data: LoginData): Observable<RespuestaServidor> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    let options = { headers: headers };
    console.log(data);
   

    return this.http.post<RespuestaServidor>(`${this.apiURL}/login/student`, data, options);

  }

  changePasword(password: string): Observable<StudentData> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    let options = { headers: headers };
    this.student!.password = password;
    console.log(this.student);
    return this.http.post<StudentData>(`${this.apiURL}/student/${this.student?.id}/change-password`, this.student, options);
  }

  changeImg(img:string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    let options = { headers: headers };
    this.student.img = img;
    return this.http.post<StudentData>(`${this.apiURL}/student/updateimg`, this.student, options);
  }


  getStudent(id:number): Observable<StudentData> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    let options = { headers: headers };

    return this.http.get<StudentData>(`${this.apiURL}/student/get/${id}`,options);
  }
  saveUser(student: StudentData): Observable<StudentData> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    let options = { headers: headers };

    return this.http.put<StudentData>(`${this.apiURL}/student/update/${student.id}`, student,options);
  }
  
  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    
    let options = { headers: headers };

    return this.http.post(`${this.apiURL}/register/student`, data, options);
  }
}
