import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelItemXsComponent } from './graphic-novel-item-xs.component';

describe('GraphicNovelItemXsComponent', () => {
  let component: GraphicNovelItemXsComponent;
  let fixture: ComponentFixture<GraphicNovelItemXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelItemXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelItemXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
