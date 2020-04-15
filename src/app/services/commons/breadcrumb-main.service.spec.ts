import { TestBed } from '@angular/core/testing';

import { BreadcrumbMainService } from './breadcrumb-main.service';

describe('BreadcrumbMainService', () => {
  let service: BreadcrumbMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
