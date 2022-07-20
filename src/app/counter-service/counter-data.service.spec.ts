import { TestBed } from '@angular/core/testing';

import { CounterDataService } from './counter-data.service';

describe('CounterDataService', () => {
  let service: CounterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
