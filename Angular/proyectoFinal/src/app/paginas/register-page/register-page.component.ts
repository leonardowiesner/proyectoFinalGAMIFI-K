import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  RegisterPageComponent: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.RegisterPageComponent = this.fb.group({
      nick: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      centro: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
