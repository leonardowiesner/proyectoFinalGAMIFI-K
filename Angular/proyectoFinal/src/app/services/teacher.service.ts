import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiBaseUrl = 'http://127.0.0.1:8000/api'; // aquí va la URL de la API de Laravel
  user: LoginData = { email: '', password: '' };

  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginData) {
    let email=data.email
    let password=data.password
    return this.http.post('http://127.0.0.1:8000/api/register/teacher', data);
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
