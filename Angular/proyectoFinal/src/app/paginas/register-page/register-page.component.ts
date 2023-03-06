import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavBarService } from 'src/app/services/nav-bar.service';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  mostrarFormulario1 = true;
  mostrarFormulario2 = false;
  constructor(
    private readonly navBarService: NavBarService
   ) {
    navBarService.showNavbar = false; //Ocultar nav bar en el formulario de registro

  }

  
  ngOnInit() {

  }


  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('passwordConfirm')?.value;

    return pass === confirmPass ? null : { notSame: true };
  }



}
