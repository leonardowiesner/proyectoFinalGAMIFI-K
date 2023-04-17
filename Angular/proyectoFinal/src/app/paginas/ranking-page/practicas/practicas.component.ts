import { Component, EventEmitter, Input, OnInit, Output } from 
'@angular/core';
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
  constructor() {

  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.practicasDelivered));
    
  }

  practiceSelected(id_student: number) {
    this.onPracticeSelected.emit(id_student);
  }
}
