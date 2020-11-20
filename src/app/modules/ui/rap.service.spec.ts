import { TestBed } from '@angular/core/testing';

import { RapService } from './rap.service';

describe('RapService', () => {
  let service: RapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
