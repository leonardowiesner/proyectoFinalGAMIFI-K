import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from 
'@angular/core';
import * as saveAs from 'file-saver';
import { Entregas } from 'src/app/interfaces/entrgas.interface';

@Component({
  selector: 'app-practicas',
  templateUrl: './practicas.component.html',
  styleUrls: ['./practicas.component.css']
})
export class PracticasComponent implements OnInit {
  @Input() practicasDelivered: any[] = [];
  @Input() rankingId: number = 0;
  @Output() onPracticeSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.practicasDelivered));
    
  }
  
  downloadFile(id_student: number, id_practice: number) {
    // Asume que tu API tiene un endpoint como /api/download
    const fileUrl = `http://127.0.0.1:8000/api/teacher/download-practice-file`;
    const payload = {
      id_student: id_student,
      id_practice: id_practice,
    };

    this.http.post(fileUrl, payload, { responseType: 'blob' }).subscribe((file) => {
      const fileName = `practice_${id_practice}_${id_student}.pdf`; // Cambiar la extensión del archivo si es necesario
      saveAs(file, fileName);
    }, (error) => {
      console.error('Error al descargar el archivo:', error);
    });
  }
  updatePracticePoints(id_student: number, id_practice: number, points_practice: number) {
    // Asume que tu API tiene un endpoint como /api/teacher/edit-practice-points
    const apiUrl = `http://127.0.0.1:8000/api/teacher/edit-practice-point`;
    const payload = {
      id_student: id_student,
      id_practice: id_practice,
      points_practice: points_practice,
    };

    this.http.post(apiUrl, payload).subscribe((response) => {
      console.log('Los puntos de práctica se han actualizado correctamente.');
    }, (error) => {
      console.error('Error al actualizar los puntos de práctica:', error);
    });
  }
}
