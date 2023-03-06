import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { passwordmatch } from 'src/validators/passwordMatch';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent {

  teacherForm:FormGroup;
   
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private teacher: TeacherService,
    private readonly router: Router,
    private readonly navBarService: NavBarService) { 
    this.teacherForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarpassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      center: ['', Validators.required],
    }, [passwordmatch("password","confirmarpassword")]);
    navBarService.showNavbar = false; //Ocultar nav bar en el formulario de registro


  }
enviar() {

  console.log(this.teacherForm.value);
  this.teacher.register(JSON.stringify(this.teacherForm.value)).subscribe(
    response => {
      console.log(response);
    this.router.navigate(['/login/teacher']); 
  },
  error => {
    console.log(error);
  });
  
}


  }

