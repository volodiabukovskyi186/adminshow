import { TestBed } from '@angular/core/testing';

import { ManufacturerFormService } from './manufacturer-form.service';

describe('ManufacturerFormService', () => {
  let service: ManufacturerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
