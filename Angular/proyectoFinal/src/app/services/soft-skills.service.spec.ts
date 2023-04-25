import { TestBed } from '@angular/core/testing';

import { SoftSkillsService } from './soft-skills.service';

describe('SoftSkillsService', () => {
  let service: SoftSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
