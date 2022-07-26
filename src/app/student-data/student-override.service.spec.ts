import { TestBed } from '@angular/core/testing';

import { StudentOverrideService } from './student-override.service';

describe('StudentOverrideService', () => {
  let service: StudentOverrideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentOverrideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
