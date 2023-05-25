import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { NavBarService } from 'src/app/services/nav-bar.service';
//SweetAlert2
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

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
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly navBarService: NavBarService
  ) {
    navBarService.showNavbar = false;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const email = this.loginForm.controls['email'].value ?? '';
  const password = this.loginForm.controls['password'].value ?? '';

    this.authService.loginStudent(email, password)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Login exitoso !!',
            text: 'Te has logueado correctamente!',
          })
          this.router.navigate(['/student']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos, verifica tus credenciales !',
          })
        }
      });
  }

  ngOnInit() {}
}
