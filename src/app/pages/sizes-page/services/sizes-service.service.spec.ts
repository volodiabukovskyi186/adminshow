import { TestBed } from '@angular/core/testing';

import { SizesServiceService } from './sizes-service.service';

describe('SizesServiceService', () => {
  let service: SizesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
