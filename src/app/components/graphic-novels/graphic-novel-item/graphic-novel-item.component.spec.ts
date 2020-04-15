import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelItemComponent } from './graphic-novel-item.component';

describe('GraphicNovelItemComponent', () => {
  let component: GraphicNovelItemComponent;
  let fixture: ComponentFixture<GraphicNovelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
