import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-teachers-login',
  templateUrl: './teachers-login.component.html',
  styleUrls: ['./teachers-login.component.css']
})

export class TeachersLoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
    
   }

   loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
  }
 onSubmit() {
    const mail = this.loginForm.controls['email'].value;
    const pass = this.loginForm.controls['password'].value;

    const logData: LoginData = {
      email: (mail) ? mail : '',
      password: (pass) ? pass : ''
    };

    this.authService.login(logData)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => this.router.navigate([''])
  });
}
}