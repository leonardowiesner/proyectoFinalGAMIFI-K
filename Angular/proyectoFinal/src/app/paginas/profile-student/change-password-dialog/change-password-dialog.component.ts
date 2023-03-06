import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent  {

  password = '';
  confirmPassword = '';

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private student: StudentService) { }

  save() {
    if (this.password === this.confirmPassword) {
      this.student.changePasword(this.password).subscribe;

      this.dialogRef.close(this.password);

    } else {
      // Las contraseñas no coinciden
      alert('Las contraseñas no coinciden');
    }
  }
}