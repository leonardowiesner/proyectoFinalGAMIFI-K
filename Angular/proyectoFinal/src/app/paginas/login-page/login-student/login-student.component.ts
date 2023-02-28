import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/services/student.service';
import { RespuestaServidor } from 'src/app/interfaces/respuesta-servidor';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {

  constructor(
    private readonly studentService: StudentService,
    private readonly router: Router,
    private readonly navBarService: NavBarService,
    private http: HttpClient,
    private cookieService: CookieService // Agrega esto
  ) {
    navBarService.showNavbar = false;
  }
  

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {

   
    

    const mail = this.loginForm.controls['email'].value;
    const pass = this.loginForm.controls['password'].value;

    const logData: LoginData = {
      email: (mail) ? mail : '',
      password: (pass) ? pass : ''
    };
    console.log(this.loginForm.value);
    this.studentService.login(logData)
      .subscribe((response: RespuestaServidor) => {
        
        // El se loguea correctamente y guardamos el token
        if (response.status == 1) {
          this.studentService.token = response.token!;
          this.studentService.student = response.student;
          
          // Agrega esto para guardar los datos del usuario en la cookie
          const userData = {
            token: response.token!,
            student: response.student
          };
          this.cookieService.set('studentData', JSON.stringify(userData));
        }
        

        // En caso de error mostrar al usuario el problema
        // Swal.fire('Hello world!');
        


         this.router.navigate(['/student']); // redirigimos al usuario a la página de dashboard
      });
  
  }
  ngOnInit() {
    const userData = JSON.parse(this.cookieService.get('studentData') || '{}');
    if (userData.token) {
      this.studentService.token = userData.token;
      this.studentService.student = userData.student;
    } else {
      this.router.navigate(['/login/student']);
    }
  }
  

}