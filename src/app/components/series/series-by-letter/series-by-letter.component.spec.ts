import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesByLetterComponent } from './series-by-letter.component';

describe('SeriesByLetterComponent', () => {
  let component: SeriesByLetterComponent;
  let fixture: ComponentFixture<SeriesByLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesByLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesByLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
