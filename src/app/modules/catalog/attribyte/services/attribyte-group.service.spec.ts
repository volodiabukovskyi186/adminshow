import { TestBed } from '@angular/core/testing';

import { AttribyteGroupService } from './attribyte-group.service';

describe('AttribyteGroupService', () => {
  let service: AttribyteGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttribyteGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
