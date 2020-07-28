import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionValueFormComponent } from './option-value-form.component';

describe('OptionValueFormComponent', () => {
  let component: OptionValueFormComponent;
  let fixture: ComponentFixture<OptionValueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionValueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionValueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
