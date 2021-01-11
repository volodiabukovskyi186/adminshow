import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerFormSizesComponent } from './manufacturer-form-sizes.component';

describe('ManufacturerFormSizesComponent', () => {
  let component: ManufacturerFormSizesComponent;
  let fixture: ComponentFixture<ManufacturerFormSizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerFormSizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerFormSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
