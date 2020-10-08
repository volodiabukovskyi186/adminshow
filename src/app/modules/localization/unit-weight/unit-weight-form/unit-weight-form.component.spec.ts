import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitWeightFormComponent } from './unit-weight-form.component';

describe('UnitWeightFormComponent', () => {
  let component: UnitWeightFormComponent;
  let fixture: ComponentFixture<UnitWeightFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitWeightFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitWeightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
