import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Origins2Component } from './origins2.component';

describe('Origins2Component', () => {
  let component: Origins2Component;
  let fixture: ComponentFixture<Origins2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Origins2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Origins2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
