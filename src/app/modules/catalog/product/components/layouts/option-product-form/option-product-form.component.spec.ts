import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionProductFormComponent } from './option-product-form.component';

describe('OptionProductFormComponent', () => {
  let component: OptionProductFormComponent;
  let fixture: ComponentFixture<OptionProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
