import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOrderFormComponent } from './quick-order-form.component';

describe('QuickOrderFormComponent', () => {
  let component: QuickOrderFormComponent;
  let fixture: ComponentFixture<QuickOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
