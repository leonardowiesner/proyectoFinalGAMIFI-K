import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  teacher = {
    nickname: '',
    email: '',
    password: '',
    confirmarpassword:'',
    name: '',
    surnames: '',
    center:''
  };

  constructor(private formBuilder: FormBuilder,private http: HttpClient) { 


// ngOnInit() {
  

 }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

// enviar() {

//   console.log(this.profesor);
//  /*  return this._http.post('http://127.0.0.1:8000/api/register', JSON.stringify(this.profesor))
//   .toPromise(); */
// }
// }
