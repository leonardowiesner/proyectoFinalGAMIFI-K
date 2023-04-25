import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Module
import { AppRoutingModule } from './app-routing.module';

// Screens
import { AppComponent } from './app.component';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { RegisterPageComponent } from './paginas/register-page/register-page.component';
import { StudentFormComponent } from './paginas/register-page/student-form/student-form.component';
import { TeacherFormComponent } from './paginas/register-page/teacher-form/teacher-form.component';

// Material Design
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { LoginStudentComponent } from './paginas/login-page/login-student/login-student.component';
import { TeacherPageComponent } from './paginas/teacher-page/teacher-page.component';
import { LoginTeacherComponent } from './paginas/login-page/login-teacher/login-teacher.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    StudentFormComponent,
    TeacherFormComponent,
    LoginStudentComponent,
    LoginTeacherComponent,
    SidebarComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }