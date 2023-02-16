import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { HttpClient } from '@angular/common/http';


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

    this.teacherService.login(logData)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate([''])
    });
    return this.http.post('http://127.0.0.1:8000/api/login/student', JSON.stringify(this.loginForm.value)).toPromise();
  }
  ngOnInit(): void {
  }

}
