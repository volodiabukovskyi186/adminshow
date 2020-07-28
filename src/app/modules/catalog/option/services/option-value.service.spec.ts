import { TestBed } from '@angular/core/testing';

import { OptionValueService } from './option-value.service';

describe('OptionValueService', () => {
  let service: OptionValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
