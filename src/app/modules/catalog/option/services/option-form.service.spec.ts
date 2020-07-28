import { TestBed } from '@angular/core/testing';

import { OptionFormService } from './option-form.service';

describe('OptionFormService', () => {
  let service: OptionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
