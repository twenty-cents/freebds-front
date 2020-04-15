import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieItemComponent } from './serie-item.component';

describe('SerieItemComponent', () => {
  let component: SerieItemComponent;
  let fixture: ComponentFixture<SerieItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
