import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  alumno = {
    nick: '',
    email: '',
    contrasena: '',
    confirmarContrasena:'',
    nombre: '',
    apellidos: '',
    nacimiento: ''
  };
  constructor() { 

  }

  ngOnInit(): void {
  }
  enviar() {
    console.log(this.alumno);
  }
}
