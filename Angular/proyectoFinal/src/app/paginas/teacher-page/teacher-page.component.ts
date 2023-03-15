import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {

  teacherForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.teacherForm = this.formBuilder.group({
    nickname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmarpassword: ['', Validators.required],
    name: ['', Validators.required],
    surnames: ['', Validators.required],
    center: ['', Validators.required]
    }
    );
    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    
    enviar() {
    if (this.teacherForm.valid) {
    console.log(this.teacherForm.value);
    // Aquí puedes enviar la información a un servicio o almacenarla en algún lugar
      }
    }
}
