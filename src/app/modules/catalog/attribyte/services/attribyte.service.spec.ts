import { TestBed } from '@angular/core/testing';

import { AttribyteService } from './attribyte.service';

describe('AttribyteService', () => {
  let service: AttribyteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttribyteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
