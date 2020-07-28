import { TestBed } from '@angular/core/testing';

import { SiteMenuFormService } from './site-menu-form.service';

describe('SiteMenuFormService', () => {
  let service: SiteMenuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteMenuFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
