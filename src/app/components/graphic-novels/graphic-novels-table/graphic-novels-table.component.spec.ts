import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelsTableComponent } from './graphic-novels-table.component';

describe('GraphicNovelsTableComponent', () => {
  let component: GraphicNovelsTableComponent;
  let fixture: ComponentFixture<GraphicNovelsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
