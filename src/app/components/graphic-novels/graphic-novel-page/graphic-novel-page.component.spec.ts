import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelPageComponent } from './graphic-novel-page.component';

describe('GraphicNovelPageComponent', () => {
  let component: GraphicNovelPageComponent;
  let fixture: ComponentFixture<GraphicNovelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
