import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFormPaymentComponent } from './country-form-payment.component';

describe('CountryFormPaymentComponent', () => {
  let component: CountryFormPaymentComponent;
  let fixture: ComponentFixture<CountryFormPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryFormPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFormPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
