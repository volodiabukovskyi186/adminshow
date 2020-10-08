import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitWeightPageComponent } from './unit-weight-page.component';

describe('UnitWeightPageComponent', () => {
  let component: UnitWeightPageComponent;
  let fixture: ComponentFixture<UnitWeightPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitWeightPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitWeightPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
