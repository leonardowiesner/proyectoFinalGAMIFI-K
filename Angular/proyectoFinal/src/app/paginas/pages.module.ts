import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { StudentPageComponent } from './student-page/student-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginStudentComponent } from './login-page/login-student/login-student.component';
import { LoginTeacherComponent } from './login-page/login-teacher/login-teacher.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ChangePasswordDialogComponent } from './profile-student/change-password-dialog/change-password-dialog.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RankingPageComponent } from './ranking-page/ranking-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PracticasComponent } from './ranking-page/practicas/practicas.component';
import { StudentSoftSkillEvaluationComponent } from './student-soft-skill-evaluation/student-soft-skill-evaluation.component';
import { HistorySkillsComponent } from './history-skills/history-skills.component';


@NgModule({
  declarations: [MainPageComponent, StudentPageComponent,TeacherPageComponent, ProfileTeacherComponent, ProfileStudentComponent, ChangePasswordDialogComponent, RankingPageComponent, PracticasComponent, StudentSoftSkillEvaluationComponent, HistorySkillsComponent  ],
  imports: [
    ReactiveFormsModule,
    PagesRoutingModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    CommonModule

  ]
})
export class PagesModule { }