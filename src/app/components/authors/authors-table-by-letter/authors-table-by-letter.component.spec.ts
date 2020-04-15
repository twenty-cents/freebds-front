import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsTableByLetterComponent } from './authors-table-by-letter.component';

describe('AuthorsTableByLetterComponent', () => {
  let component: AuthorsTableByLetterComponent;
  let fixture: ComponentFixture<AuthorsTableByLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsTableByLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsTableByLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
