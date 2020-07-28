import { TestBed } from '@angular/core/testing';

import { SitePageFormService } from './site-page-form.service';

describe('SitePageFormService', () => {
  let service: SitePageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitePageFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
