import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { passwordmatch } from 'src/validators/passwordMatch';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent {

  teacherForm:FormGroup;
   
  constructor(private fb: FormBuilder,private http: HttpClient,  private readonly router: Router,) { 
    this.teacherForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarpassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      center: ['', Validators.required],
    }, [passwordmatch("password","confirmarpassword")]);
  }

  // enviar() {


enviar() {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json' });
  let options = { headers: headers };

  console.log(this.teacherForm.value);
  return this.http.post('http://127.0.0.1:8000/api/register/teacher', JSON.stringify(this.teacherForm.value), options).subscribe(response => {
    console.log(response);
    this.router.navigate(['/login/teacher']); 
  });
  
}


  }

