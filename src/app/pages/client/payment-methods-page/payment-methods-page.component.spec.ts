import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsPageComponent } from './payment-methods-page.component';

describe('PaymentMethodsPageComponent', () => {
  let component: PaymentMethodsPageComponent;
  let fixture: ComponentFixture<PaymentMethodsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
