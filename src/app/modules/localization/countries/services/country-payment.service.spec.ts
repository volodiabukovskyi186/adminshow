import { TestBed } from '@angular/core/testing';

import { CountryPaymentService } from './country-payment.service';

describe('CountryPaymentService', () => {
  let service: CountryPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
