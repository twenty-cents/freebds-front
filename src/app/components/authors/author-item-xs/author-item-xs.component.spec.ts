import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorItemXsComponent } from './author-item-xs.component';

describe('AuthorItemXsComponent', () => {
  let component: AuthorItemXsComponent;
  let fixture: ComponentFixture<AuthorItemXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorItemXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorItemXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
