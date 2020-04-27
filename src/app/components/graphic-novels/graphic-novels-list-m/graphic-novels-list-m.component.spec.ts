import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelsListMComponent } from './graphic-novels-list-m.component';

describe('GraphicNovelsListMComponent', () => {
  let component: GraphicNovelsListMComponent;
  let fixture: ComponentFixture<GraphicNovelsListMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelsListMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelsListMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
