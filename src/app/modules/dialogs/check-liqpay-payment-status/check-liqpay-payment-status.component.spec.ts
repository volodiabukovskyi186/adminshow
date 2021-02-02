import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLiqpayPaymentStatusComponent } from './check-liqpay-payment-status.component';

describe('CheckLiqpayPaymentStatusComponent', () => {
  let component: CheckLiqpayPaymentStatusComponent;
  let fixture: ComponentFixture<CheckLiqpayPaymentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckLiqpayPaymentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckLiqpayPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
