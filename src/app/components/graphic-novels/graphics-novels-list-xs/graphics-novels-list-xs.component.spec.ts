import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsNovelsListXsComponent } from './graphics-novels-list-xs.component';

describe('GraphicsNovelsListXsComponent', () => {
  let component: GraphicsNovelsListXsComponent;
  let fixture: ComponentFixture<GraphicsNovelsListXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsNovelsListXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsNovelsListXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
