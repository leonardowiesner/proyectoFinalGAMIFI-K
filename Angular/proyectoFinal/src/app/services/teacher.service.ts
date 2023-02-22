import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { RespuestaServidor } from '../interfaces/respuesta-servidor';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  user: LoginData = { email: '', password: '' };
  token: string = "";
  apiURL: string = "http://127.0.0.1:8000/api";
  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginData) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    console.log(data);
    return this.http.post<RespuestaServidor>(`${this.apiURL}/login/teacher`, data);
  }

  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    let options = { headers: headers };

    return this.http.post('http://127.0.0.1:8000/api/register/teacher', data, options);
  }
}
