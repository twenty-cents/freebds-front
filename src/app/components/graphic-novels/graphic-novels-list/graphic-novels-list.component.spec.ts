import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelsListComponent } from './graphic-novels-list.component';

describe('GraphicNovelsListComponent', () => {
  let component: GraphicNovelsListComponent;
  let fixture: ComponentFixture<GraphicNovelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
