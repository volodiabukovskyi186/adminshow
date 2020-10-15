import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMethodsPageComponent } from './delivery-methods-page.component';

describe('DeliveryMethodsPageComponent', () => {
  let component: DeliveryMethodsPageComponent;
  let fixture: ComponentFixture<DeliveryMethodsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryMethodsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryMethodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
