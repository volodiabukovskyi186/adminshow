import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMethodsFormComponent } from './delivery-methods-form.component';

describe('DeliveryMethodsFormComponent', () => {
  let component: DeliveryMethodsFormComponent;
  let fixture: ComponentFixture<DeliveryMethodsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryMethodsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryMethodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
