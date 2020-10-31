import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LipayFormComponent } from './lipay-form.component';

describe('LipayFormComponent', () => {
  let component: LipayFormComponent;
  let fixture: ComponentFixture<LipayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LipayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LipayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
