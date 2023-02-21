import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${this.apiBaseUrl}/login/teacher`, {email,password});


    return this.http.get<LoginData>(this.apiBaseUrl).pipe(
      filter((value: any) => {
        let found = false;

        for (let i = 0; i < value.length; i++) {
          if (value[i].email == data.email && value[i].password == data.password) {
            found = true;
            this.user = {
              email: value[i].email,
              password: value[i].password,
            };
            break;
          }
        }

        return found;
      })
    );
  }
}
