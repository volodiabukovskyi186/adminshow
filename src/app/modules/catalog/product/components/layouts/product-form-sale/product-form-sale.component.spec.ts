import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormSaleComponent } from './product-form-sale.component';

describe('ProductFormSaleComponent', () => {
  let component: ProductFormSaleComponent;
  let fixture: ComponentFixture<ProductFormSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
