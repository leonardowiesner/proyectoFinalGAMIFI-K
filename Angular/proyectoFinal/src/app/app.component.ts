import { Component } from '@angular/core';
import { NavBarService } from './services/nav-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private app: NavBarService) {
    this.app.showNavbar = true;
  }
  title = 'proyectoFinal';
  
  public get showNavBar() : boolean {
    return this.app.showNavbar;
  }
  
}