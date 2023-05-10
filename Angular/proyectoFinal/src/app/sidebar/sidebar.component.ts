import { Component } from '@angular/core';
import { StudentData } from '../interfaces/alumnos-data.interface';
import { TeachersData } from '../interfaces/profesores-data.interface';
import { AuthService } from '../services/auth.service';
import { NavBarService } from '../services/nav-bar.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  teacher: any = null; // El tipo de datos depende de tu implementación
  student: any = null;
  constructor(private authService: AuthService,private app: NavBarService, private teacherService:TeacherService,private studentService:StudentService ) {
    this.app.showNavbar = true;
    this.teacher=this.teacherService.teacher;
    this.student=this.studentService.student;
    if (this.authService.isTeacher()) {
      this.teacher = this.authService.getTeacher();
    } else if (this.authService.isStudent()) {
      this.student = this.authService.getStudent();
    
  }
  console.log(this.student.name);
  
  }
  isMenuOpen = true;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public get showNavBar() : boolean {
    return this.app.showNavbar;
  }
}
