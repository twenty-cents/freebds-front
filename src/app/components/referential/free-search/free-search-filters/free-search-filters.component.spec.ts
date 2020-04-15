import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSearchFiltersComponent } from './free-search-filters.component';

describe('FreeSearchFiltersComponent', () => {
  let component: FreeSearchFiltersComponent;
  let fixture: ComponentFixture<FreeSearchFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeSearchFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
