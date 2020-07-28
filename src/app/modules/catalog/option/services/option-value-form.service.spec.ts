import { TestBed } from '@angular/core/testing';

import { OptionValueFormService } from './option-value-form.service';

describe('OptionValueFormService', () => {
  let service: OptionValueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionValueFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
