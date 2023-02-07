import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersLoginComponent } from './teachers-login.component';

describe('TeachersLoginComponent', () => {
  let component: TeachersLoginComponent;
  let fixture: ComponentFixture<TeachersLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
