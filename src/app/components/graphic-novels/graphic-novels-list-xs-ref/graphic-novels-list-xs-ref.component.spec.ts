import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelsListXsRefComponent } from './graphic-novels-list-xs-ref.component';

describe('GraphicNovelsListXsRefComponent', () => {
  let component: GraphicNovelsListXsRefComponent;
  let fixture: ComponentFixture<GraphicNovelsListXsRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelsListXsRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelsListXsRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
