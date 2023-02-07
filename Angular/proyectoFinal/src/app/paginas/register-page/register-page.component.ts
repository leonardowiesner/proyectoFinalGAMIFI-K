import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  showForm1 = true;
  constructor( ) {

  }

  
  ngOnInit() {

  }


  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('passwordConfirm')?.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  

  submitForm1(formValue: any) {
    console.log(formValue);
  }

  submitForm2(formValue: any) {
    console.log(formValue);
  }
}
