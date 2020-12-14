import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketFilterComponent } from './basket-filter.component';

describe('BasketFilterComponent', () => {
  let component: BasketFilterComponent;
  let fixture: ComponentFixture<BasketFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
