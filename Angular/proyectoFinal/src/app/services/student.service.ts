import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  fakeUrl: string = 'http://127.0.0.1:8000/api/login/student';
  user: LoginData = { email: '', password: '' };

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
   
    return this.http.post('http://127.0.0.1:8000/api/login/student', data, options);
  }

  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    let options = { headers: headers };

    return this.http.post('http://127.0.0.1:8000/api/register/student', data, options);
  }
}
