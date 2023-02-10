import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  profesor = {
    nick: '',
    email: '',
    contrasena: '',
    confirmarContrasena:'',
    nombre: '',
    apellidos: '',
    centro: ''
  };
  constructor(private formBuilder: FormBuilder,private _http: Http) { 

  }


ngOnInit() {
  

}

enviar() {
  console.log(this.profesor);
  return this._http.post('http://127.0.0.1:8000/api/register', JSON.stringify(this.profesor))
  .toPromise();
}
}
