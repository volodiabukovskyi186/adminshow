import { TestBed } from '@angular/core/testing';

import { DeliveryMethodsService } from './delivery-methods.service';

describe('DeliveryMethodsService', () => {
  let service: DeliveryMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
