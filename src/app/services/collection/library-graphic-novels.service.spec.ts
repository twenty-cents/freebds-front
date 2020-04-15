import { TestBed } from '@angular/core/testing';

import { LibraryGraphicNovelsService } from './library-graphic-novels.service';

describe('LibraryGraphicNovelsService', () => {
  let service: LibraryGraphicNovelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryGraphicNovelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
