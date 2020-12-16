import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInformationComponent } from './option-information.component';

describe('OptionInformationComponent', () => {
  let component: OptionInformationComponent;
  let fixture: ComponentFixture<OptionInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
