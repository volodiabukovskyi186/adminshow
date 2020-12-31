import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeGroupsFormComponent } from './size-groups-form.component';

describe('SizeGroupsFormComponent', () => {
  let component: SizeGroupsFormComponent;
  let fixture: ComponentFixture<SizeGroupsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeGroupsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeGroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
