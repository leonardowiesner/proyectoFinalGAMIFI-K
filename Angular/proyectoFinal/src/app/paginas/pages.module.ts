import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    PagesRoutingModule,
  ]
})
export class PagesModule { }
