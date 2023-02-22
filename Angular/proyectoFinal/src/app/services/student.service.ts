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

  login(data: LoginData): Observable<LoginData> {

    return this.http.get<LoginData>(this.fakeUrl).pipe(
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

  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    let options = { headers: headers };

    return this.http.post('http://127.0.0.1:8000/api/register/student', data, options);
  }
}