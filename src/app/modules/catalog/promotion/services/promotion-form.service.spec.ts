import { TestBed } from '@angular/core/testing';

import { PromotionFormService } from './promotion-form.service';

describe('PromotionFormService', () => {
  let service: PromotionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
