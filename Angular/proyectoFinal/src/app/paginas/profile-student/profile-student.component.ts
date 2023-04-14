import { Component, OnInit } from '@angular/core';
import { StudentData } from 'src/app/interfaces/alumnos-data.interface';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  student: StudentData;
  srcImg: string = "https://i.imgur.com/n6F53V0.jpg";
  cambiar: boolean = false;
  studentForm: FormGroup;
  fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private dialog: MatDialog,
    private readonly navBarService: NavBarService
  ) {
    this.student = { id: 0, nickname: "", name: "", surnames: "", email: "", password: "", img: "", nacimiento: new Date };

    this.studentForm = this.fb.group({
      nickname: [this.student.nickname, Validators.required],
      email: [this.student.email, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password: [this.student.password, [Validators.required, Validators.minLength(8)]],
      name: [this.student.name, Validators.required],
      surnames: [this.student.surnames, Validators.required],
    });
  }


  ngOnInit(): void {
    // Obtener el valor de la cookie 'user_id'



    if (this.studentService.student) {
      this.student = this.studentService.student;
    }
    this.studentService.getStudent(this.student.id).subscribe(student => {
      console.log(student);
      this.student = student;
      this.updateFormValues();
    });
    console.log(this.student);
    this.student = this.studentService.student;
  }



  save() {
    const nicknameControl = this.studentForm.get('nickname');
    const emailControl = this.studentForm.get('email');
    const passwordControl = this.studentForm.get('password');
    const nameControl = this.studentForm.get('name');
    const surnamesControl = this.studentForm.get('surnames');

    if (nicknameControl) this.student.nickname = nicknameControl.value;
    if (emailControl) this.student.email = emailControl.value;
    if (passwordControl) this.student.password = passwordControl.value;
    if (nameControl) this.student.name = nameControl.value;
    if (surnamesControl) this.student.surnames = surnamesControl.value;

    this.studentService.saveUser(this.student).subscribe(() => {
      console.log('Usuario guardado');
    });
  }


  //img upload

  onFileSelected(event: any) {
    
    this.fileToUpload = event.target.files[0];
  }

  updatePicture() {
    console.log("file"+this.fileToUpload?.name);
    console.log("id Student file"+this.student.id);

    if (this.fileToUpload && this.student.id) {
      this.srcImg = "http://localhost:8000/storage/images/"+this.fileToUpload.name;
      this.studentService.updatePicture(this.student.id, this.fileToUpload)
        .subscribe(
          response => console.log('Picture updated successfully.'),
          error => console.error(error)
        );
    }
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

  updateFormValues() {
    this.studentForm.patchValue({
      nickname: this.student.nickname,
      email: this.student.email,
      password: this.student.password,
      name: this.student.name,
      surnames: this.student.surnames,
    });
  }
  mostrar() {
    if (this.cambiar == false) {
      this.cambiar = true;
    } else {
      this.cambiar = false
    }
  }

}
