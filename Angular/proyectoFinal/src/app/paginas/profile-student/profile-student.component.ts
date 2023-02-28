import { Component, OnInit } from '@angular/core';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  student: StudentData;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) { 
    this.student = {id: 0, nick : "", name:"", surnames:"", email:"", password:"",nacimiento: new Date }
  }


  ngOnInit(): void {
     // Obtener el valor de la cookie 'user_id'
    const userId = this.cookieService.get('user_id');
    console.log('User ID:', userId);

    if(this.studentService.student){
    this.student=this.studentService.student;
  }
    this.studentService.getStudent(this.student.id).subscribe(student => {

      console.log(student);
      this.student = student;
  
    });
    console.log(this.student);
  }



  save() {
    this.studentService.saveUser(this.student).subscribe(() => {
      console.log('Usuario guardado');
    });
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario ha ingresado una nueva contraseña
        this.student.password = result;
        
        this.save();
      }
    });
  }

}
