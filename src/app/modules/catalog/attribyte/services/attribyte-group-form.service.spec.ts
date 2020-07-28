import { TestBed } from '@angular/core/testing';

import { AttribyteGroupFormService } from './attribyte-group-form.service';

describe('AttribyteGroupFormService', () => {
  let service: AttribyteGroupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttribyteGroupFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
