import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { HttpClient } from '@angular/common/http';
import { RespuestaServidor } from 'src/app/interfaces/respuesta-servidor';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login-teacher',
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.css']
})
export class LoginTeacherComponent implements OnInit {

  constructor(
    private readonly teacherService: TeacherService,
    private readonly router: Router,
    
    private readonly navBarService: NavBarService,
    private http: HttpClient
  ) { 
    navBarService.showNavbar = false;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {

    console.log(this.loginForm);
    

    const mail = this.loginForm.controls['email'].value;
    const pass = this.loginForm.controls['password'].value;

    const logData: LoginData = {
      email: (mail) ? mail : '',
      password: (pass) ? pass : ''
    };
   
    console.log(this.loginForm.value);
    this.teacherService.login(logData)
      .subscribe((response: RespuestaServidor) => {
        
        // El se loguea correctamente y guardamos el token
        if (response.status == 1) {
          this.teacherService.token = response.token!;
        }

        // En caso de error mostrar al usuario el problema
        // Swal.fire('Hello world!');
        

         this.router.navigate(['/teacher']); // redirigimos al usuario a la página de dashboard
      });
  
  }
  ngOnInit(): void {
  }

  
}