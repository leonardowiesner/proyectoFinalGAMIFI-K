import { Component, OnInit } from '@angular/core';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';


@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  student: StudentData;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) { 
    this.student = {id: 0, nick : "", nombre:"asdasd", apellidos:"", email:"", password:"",nacimiento: new Date() }
  }

  ngOnInit(): void {
    this.studentService.getStudent().subscribe(student => {
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
