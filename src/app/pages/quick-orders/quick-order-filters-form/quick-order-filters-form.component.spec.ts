import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOrderFiltersFormComponent } from './quick-order-filters-form.component';

describe('QuickOrderFiltersFormComponent', () => {
  let component: QuickOrderFiltersFormComponent;
  let fixture: ComponentFixture<QuickOrderFiltersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickOrderFiltersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
