import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicNovelItemDialogComponent } from './graphic-novel-item-dialog.component';

describe('GraphicNovelItemDialogComponent', () => {
  let component: GraphicNovelItemDialogComponent;
  let fixture: ComponentFixture<GraphicNovelItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicNovelItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicNovelItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
