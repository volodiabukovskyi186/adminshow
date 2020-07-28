import { TestBed } from '@angular/core/testing';

import { ProductAttributesService } from './product-attributes.service';

describe('ProductAttributesService', () => {
  let service: ProductAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
