import { TestBed } from '@angular/core/testing';

import { CounterResolver } from './counter.resolver';

describe('CounterResolver', () => {
  let resolver: CounterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CounterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
