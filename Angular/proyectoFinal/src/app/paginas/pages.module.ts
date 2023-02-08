import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { StudentFormComponent } from './register-page/student-form/student-form.component';
import { TeacherFormComponent } from './register-page/teacher-form/teacher-form.component';
import { StudentsLoginComponent } from './login-page/students-login/students-login.component';
import { TeachersLoginComponent } from './login-page/teachers-login/teachers-login.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [MainPageComponent, RegisterPageComponent, StudentFormComponent, TeacherFormComponent, StudentsLoginComponent, TeachersLoginComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatIconModule
  ]
})
export class PagesModule { }
