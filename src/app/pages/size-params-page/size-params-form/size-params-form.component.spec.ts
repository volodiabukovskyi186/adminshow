import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeParamsFormComponent } from './size-params-form.component';

describe('SizeParamsFormComponent', () => {
  let component: SizeParamsFormComponent;
  let fixture: ComponentFixture<SizeParamsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeParamsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeParamsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
