import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqpayPageComponent } from './liqpay-page.component';

describe('LiqpayPageComponent', () => {
  let component: LiqpayPageComponent;
  let fixture: ComponentFixture<LiqpayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiqpayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiqpayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
