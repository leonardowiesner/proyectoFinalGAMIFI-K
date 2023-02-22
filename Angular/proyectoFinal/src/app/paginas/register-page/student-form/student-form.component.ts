import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordmatch } from 'src/validators/passwordMatch';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private student: StudentService,
    private readonly router: Router) {
    this.studentForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarpassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      birth_date: ['', Validators.required],
    }, [passwordmatch("password", "confirmarpassword")]);
  }

  ngOnInit(): void {
  }
  enviar() {
    console.log(this.studentForm.value);

    this.student.register(JSON.stringify(this.studentForm.value)).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/login/student']);
      },
      error => {
        console.log(error);
      });
  }



}
