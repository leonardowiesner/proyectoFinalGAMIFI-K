import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { passwordmatch } from 'src/validators/passwordMatch';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm:FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) { 
    this.studentForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarpassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      birth_date: ['', Validators.required],
    }, [passwordmatch("password","confirmarpassword")]);
  }

  ngOnInit(): void {
  }
  enviar() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json' });
    let options = { headers: headers };
    
    console.log(this.studentForm.value);
    return this.http.post('http://127.0.0.1:8000/api/register/student', JSON.stringify(this.studentForm.value), options).subscribe(response => {
      console.log(response);
    });

  }


  
}
