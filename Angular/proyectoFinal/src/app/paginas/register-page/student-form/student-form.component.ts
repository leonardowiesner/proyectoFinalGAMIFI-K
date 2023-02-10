import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  alumno = {
    nickname: '',
    email: '',
    password: '',
    confirmarContrasena:'',
    name: '',
    surnames: '',
    birth_date: ''
  };
  constructor(private formBuilder: FormBuilder,private http: HttpClient) { 

  }

  ngOnInit(): void {
  }
  enviar() {
    console.log(this.alumno);
    return this.http.post('http://127.0.0.1:8000/api/register/student', JSON.stringify(this.alumno))
    .toPromise();
  }
}
