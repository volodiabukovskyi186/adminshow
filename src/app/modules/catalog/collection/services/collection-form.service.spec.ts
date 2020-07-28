import { TestBed } from '@angular/core/testing';

import { CollectionFormService } from './collection-form.service';

describe('CollectionFormService', () => {
  let service: CollectionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
