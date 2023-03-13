import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { RankingService } from 'src/app/services/ranking.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeachersData } from 'src/app/interfaces/profesores-data.interface';
@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {
  teacher:TeachersData;
  nombreRanking: string="";

  constructor(private rankingservice:RankingService,private teacherService:TeacherService) {
    this.teacher = {id: 0, nickname : "", name:"", surnames:"", email:"", password:"",img:"",centro: "" }
    }
  ngOnInit(): void {
    if(this.teacherService.teacher){
      this.teacher=this.teacherService.teacher;
    }
    this.teacherService.getTeacher().subscribe(teacher => {

      console.log(teacher);
      this.teacher = teacher;
  
    });
    
  }
    
crearRanking(){
  const uuid = uuidv4();
  this.teacherService.getTeacher().subscribe(teacher => {

    console.log(teacher);
    this.teacher = teacher;

  });
  debugger
  this.rankingservice.crearRanking(this.nombreRanking,uuid,this.teacher.id).subscribe();

  
}

 
}
