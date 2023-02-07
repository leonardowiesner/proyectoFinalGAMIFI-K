import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './paginas/login-page/login-page.component';
import { MainPageComponent } from './paginas/main-page/main-page.component';
import { RegisterPageComponent } from './paginas/register-page/register-page.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', loadChildren: () => import('./paginas/pages.module').then((m) => m.PagesModule), canActivate: [AuthGuard]},
  { path: 'main', redirectTo: '/main', pathMatch: 'full' },
  { path: 'register', redirectTo: '/register', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
