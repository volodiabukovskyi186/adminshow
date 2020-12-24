import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionValueComponent } from './product-option-value.component';

describe('ProductOptionValueComponent', () => {
  let component: ProductOptionValueComponent;
  let fixture: ComponentFixture<ProductOptionValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
