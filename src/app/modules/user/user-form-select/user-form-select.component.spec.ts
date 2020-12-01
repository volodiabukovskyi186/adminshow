import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormSelectComponent } from './user-form-select.component';

describe('UserFormSelectComponent', () => {
  let component: UserFormSelectComponent;
  let fixture: ComponentFixture<UserFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
