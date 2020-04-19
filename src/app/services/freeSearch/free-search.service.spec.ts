import { TestBed } from '@angular/core/testing';

import { FreeSearchService } from './free-search.service';

describe('FreeSearchService', () => {
  let service: FreeSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
