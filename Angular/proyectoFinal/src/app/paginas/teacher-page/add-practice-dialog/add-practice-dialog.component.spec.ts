import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPracticeDialogComponent } from './add-practice-dialog.component';

describe('AddPracticeDialogComponent', () => {
  let component: AddPracticeDialogComponent;
  let fixture: ComponentFixture<AddPracticeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPracticeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPracticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
