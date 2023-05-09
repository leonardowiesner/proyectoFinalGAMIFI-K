import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://127.0.0.1:8000/api';
  private token: string | null | undefined;

  constructor(private http: HttpClient,private router: Router) {}

  loginStudent(email: string, password: string): Observable<HttpResponse<any>> {
    const body = { email, password };
  
    return this.http.post<any>(`${this.API_URL}/login/student`, body, { observe: 'response' }).pipe(
      tap((response) => {
        // Save the token in the localStorage
        if (response.body && response.body.token) {
          window.localStorage.setItem('authToken', response.body.token);
          window.localStorage.setItem('student', JSON.stringify(response.body.student)); // Agrega esta línea para guardar la información del usuario
        }
      })
    );
  }
  
  getAccessToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getStudent(): any {
    const studentData = window.localStorage.getItem('student');
    return studentData ? JSON.parse(studentData) : null;
  }
  
  getTeacher(): any {
    const teacherData = window.localStorage.getItem('teacher');
    return teacherData ? JSON.parse(teacherData) : null;
  }

  loginTeacher(email: string, password: string): Observable<HttpResponse<any>> {
    const body = { email, password };
  
    return this.http.post<any>(`${this.API_URL}/login/teacher`, body, { observe: 'response' }).pipe(
      tap((response) => {
        // Save the token in the localStorage
        if (response.body && response.body.token) {
          window.localStorage.setItem('authToken', response.body.token);
          window.localStorage.setItem('teacher', JSON.stringify(response.body.teacher)); // Agrega esta línea para guardar la información del usuario
        }
      })
    );
  }

  private login(email: string, password: string, url: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(url, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('access_token', response.token);
          this.token = response.token;
        }
      })
    );
  }

  logout(): void {
    // Elimina el token del localStorage
    localStorage.removeItem('authToken');

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
