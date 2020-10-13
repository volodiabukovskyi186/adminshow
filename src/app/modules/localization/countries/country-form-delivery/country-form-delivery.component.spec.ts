import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFormDeliveryComponent } from './country-form-delivery.component';

describe('CountryFormDeliveryComponent', () => {
  let component: CountryFormDeliveryComponent;
  let fixture: ComponentFixture<CountryFormDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryFormDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFormDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
