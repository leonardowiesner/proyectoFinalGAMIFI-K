import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-practice-dialog',
  templateUrl: './add-practice-dialog.component.html',
  styleUrls: ['./add-practice-dialog.component.css']
})
export class AddPracticeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPracticeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
