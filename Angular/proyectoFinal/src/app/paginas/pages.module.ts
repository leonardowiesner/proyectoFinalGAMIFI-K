import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { StudentPageComponent } from './student-page/student-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';

@NgModule({
  declarations: [MainPageComponent, StudentPageComponent, TeacherPageComponent],
  imports: [
    PagesRoutingModule,
  ]
})
export class PagesModule { }
