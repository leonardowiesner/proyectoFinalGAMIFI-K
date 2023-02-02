import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [MainPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  
    
  ]
})
export class PagesModule { }
