import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { StudentPageComponent } from './student-page/student-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginStudentComponent } from './login-page/login-student/login-student.component';
import { LoginTeacherComponent } from './login-page/login-teacher/login-teacher.component';
@NgModule({
  declarations: [MainPageComponent, StudentPageComponent,TeacherPageComponent  ],
  imports: [
    PagesRoutingModule,
    MatFormFieldModule
  ]
})
export class PagesModule { }
