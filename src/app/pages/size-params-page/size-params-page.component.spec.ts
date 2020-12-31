import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeParamsPageComponent } from './size-params-page.component';

describe('SizeParamsPageComponent', () => {
  let component: SizeParamsPageComponent;
  let fixture: ComponentFixture<SizeParamsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeParamsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeParamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
