import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { passwordmatch } from 'src/validators/passwordMatch';
@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {

  teacherForm:FormGroup;
   
  constructor(private fb: FormBuilder,private http: HttpClient) { 
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

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // enviar() {


enviar() {
  
  console.log(this.teacherForm.value);
  return this.http.post('http://127.0.0.1:8000/api/teacher/register', JSON.stringify(this.teacherForm.value))
  .toPromise();
  
}


  }

