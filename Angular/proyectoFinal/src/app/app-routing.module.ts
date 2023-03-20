import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { RegisterPageComponent } from './paginas/register-page/register-page.component';
import { ProfileStudentComponent } from './paginas/profile-student/profile-student.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'editstudentprofile', component: ProfileStudentComponent},
  { path: '', loadChildren: () => import('./paginas/pages.module').then((m) => m.PagesModule)//, canActivate: [AuthGuard]
},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }