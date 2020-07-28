import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionItemComponent } from './permission-item.component';

describe('PermissionComponent', () => {
  let component: PermissionItemComponent;
  let fixture: ComponentFixture<PermissionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
