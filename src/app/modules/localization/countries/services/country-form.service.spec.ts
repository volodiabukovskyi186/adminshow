import { TestBed } from '@angular/core/testing';

import { CountryFormService } from './country-form.service';

describe('CountryFormService', () => {
  let service: CountryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
