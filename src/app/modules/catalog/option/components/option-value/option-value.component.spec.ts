import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionValueComponent } from './option-value.component';

describe('OptionValueComponent', () => {
  let component: OptionValueComponent;
  let fixture: ComponentFixture<OptionValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
