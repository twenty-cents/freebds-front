import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSearchManagerComponent } from './free-search-manager.component';

describe('FreeSearchManagerComponent', () => {
  let component: FreeSearchManagerComponent;
  let fixture: ComponentFixture<FreeSearchManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeSearchManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeSearchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
