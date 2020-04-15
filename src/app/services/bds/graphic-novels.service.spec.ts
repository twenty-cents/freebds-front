import { TestBed } from '@angular/core/testing';

import { GraphicNovelsService } from './graphic-novels.service';

describe('GraphicNovelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphicNovelsService = TestBed.get(GraphicNovelsService);
    expect(service).toBeTruthy();
  });
});
