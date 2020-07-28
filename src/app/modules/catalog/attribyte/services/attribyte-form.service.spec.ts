import { TestBed } from '@angular/core/testing';

import { AttribyteFormService } from './attribyte-form.service';

describe('AttribyteFormService', () => {
  let service: AttribyteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttribyteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
