import { Component, OnInit } from '@angular/core';
import { TeachersData } from 'src/app/interfaces/profesores-data.interface'; 
import { TeacherService } from 'src/app/services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent implements OnInit {
  teacher: TeachersData;
  teacherForm:FormGroup;
  fileToUpload: File | null = null;
  srcImg: string = "";


  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private readonly navBarService: NavBarService
  ) { 
    navBarService.showNavbar = true;
    this.teacher = {id: 0, nickname : "", name:"", surnames:"", email:"", password:"",img:"",centro: ""}
    this.teacherForm = this.fb.group({
      nickname: [this.teacher.nickname, Validators.required],
      email: [this.teacher.email, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password: [this.teacher.password, [Validators.required, Validators.minLength(8)]],
      name: [this.teacher.name, Validators.required],
      surnames: [this.teacher.surnames, Validators.required],
    });
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


     //img upload

  onFileSelected(event: any) {
    
    this.fileToUpload = event.target.files[0];
  }

  updatePicture() {
    console.log("file"+this.fileToUpload?.name);
    console.log("id Teacher file"+this.teacher.id);

    if (this.fileToUpload && this.teacher.id) {
      this.srcImg = "http://localhost:8000/storage/images/"+this.fileToUpload.name;
      this.teacherService.updatePicture(this.teacher.id, this.fileToUpload)
        .subscribe(
          response => console.log('Picture updated successfully.'),
          error => console.error(error)
        );
    }
  }

}
