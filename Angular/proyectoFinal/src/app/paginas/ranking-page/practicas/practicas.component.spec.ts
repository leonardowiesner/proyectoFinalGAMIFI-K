import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticasComponent } from './practicas.component';

describe('PracticasComponent', () => {
  let component: PracticasComponent;
  let fixture: ComponentFixture<PracticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
