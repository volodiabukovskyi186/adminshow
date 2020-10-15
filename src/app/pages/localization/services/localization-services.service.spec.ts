import { TestBed } from '@angular/core/testing';

import { LocalizationServicesService } from './localization-services.service';

describe('LocalizationServicesService', () => {
  let service: LocalizationServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalizationServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
