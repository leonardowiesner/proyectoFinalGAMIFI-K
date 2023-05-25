import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySkillsComponent } from './history-skills.component';

describe('HistorySkillsComponent', () => {
  let component: HistorySkillsComponent;
  let fixture: ComponentFixture<HistorySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
