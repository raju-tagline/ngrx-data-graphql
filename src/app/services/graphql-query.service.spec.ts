import { TestBed } from '@angular/core/testing';

import { GraphqlQueryService } from './graphql-query.service';

describe('GraphqlQueryService', () => {
  let service: GraphqlQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
