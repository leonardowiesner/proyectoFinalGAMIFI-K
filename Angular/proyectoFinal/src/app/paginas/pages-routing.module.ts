import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import { RankingPageComponent } from './ranking-page/ranking-page.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { StudentSoftSkillEvaluationComponent } from './student-soft-skill-evaluation/student-soft-skill-evaluation.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';


//TODO: Definir las ruta/s que correspondan
const routes: Routes = [
  { path: 'ranking/:id', component: RankingPageComponent },
  {   path: 'soft-skill-evaluation/:rankingId',component: StudentSoftSkillEvaluationComponent, },
  { path: 'studentProfile', component: ProfileStudentComponent },
  { path: 'teacherProfile', component: ProfileTeacherComponent },
  { path: 'student', component: StudentPageComponent}, 
  { path: 'teacher', component: TeacherPageComponent},  
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
