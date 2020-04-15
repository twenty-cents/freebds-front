import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbMainComponent } from './breadcrumb-main.component';

describe('BreadcrumbMainComponent', () => {
  let component: BreadcrumbMainComponent;
  let fixture: ComponentFixture<BreadcrumbMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
