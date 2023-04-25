import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSoftSkillEvaluationComponent } from './student-soft-skill-evaluation.component';

describe('StudentSoftSkillEvaluationComponent', () => {
  let component: StudentSoftSkillEvaluationComponent;
  let fixture: ComponentFixture<StudentSoftSkillEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSoftSkillEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSoftSkillEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
