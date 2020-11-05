import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFiltersFormComponent } from './order-filters-form.component';

describe('OrderFiltersFormComponent', () => {
  let component: OrderFiltersFormComponent;
  let fixture: ComponentFixture<OrderFiltersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFiltersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
