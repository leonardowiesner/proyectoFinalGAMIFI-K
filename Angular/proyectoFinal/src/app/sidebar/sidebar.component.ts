import { Component } from '@angular/core';
import { NavBarService } from '../services/nav-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private app: NavBarService) {
    this.app.showNavbar = true;
  }
  isMenuOpen = true;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public get showNavBar() : boolean {
    return this.app.showNavbar;
  }
}
