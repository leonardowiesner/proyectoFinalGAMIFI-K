import { Component, OnInit } from '@angular/core';
import { TeachersData } from 'src/app/interfaces/profesores-data.interface'; 
import { TeacherService } from 'src/app/services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { NavBarService } from 'src/app/services/nav-bar.service';

//import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent implements OnInit {
  teacher: TeachersData;

  constructor(
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private readonly navBarService: NavBarService
  ) { 
    navBarService.showNavbar = true;
    this.teacher = {id: 0, nickname : "", name:"", surnames:"", email:"", password:"",img:"",centro: ""}

  }

  ngOnInit(): void {
    if(this.teacherService.teacher){
    this.teacher=this.teacherService.teacher;
  }
    this.teacherService.getTeacher().subscribe(teacher => {

      console.log(teacher);
      this.teacher = teacher;
  
    });
    console.log(this.teacher);
  }



  save() {
    this.teacherService.saveUser(this.teacher).subscribe(() => {
      console.log('Usuario guardado');
    });
  }

  openChangePasswordDialog() {
  //   const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // El usuario ha ingresado una nueva contraseña
  //       this.teacher.password = result;
  //       this.save();
  //     }
  //   });
   }

}
