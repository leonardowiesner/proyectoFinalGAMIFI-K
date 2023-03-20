import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import { RankingPageComponent } from './ranking-page/ranking-page.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';


//TODO: Definir las ruta/s que correspondan
const routes: Routes = [
  { path: 'ranking/:id', component: RankingPageComponent },
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
