import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieItemXsComponent } from './serie-item-xs.component';

describe('SerieItemXsComponent', () => {
  let component: SerieItemXsComponent;
  let fixture: ComponentFixture<SerieItemXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieItemXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieItemXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
