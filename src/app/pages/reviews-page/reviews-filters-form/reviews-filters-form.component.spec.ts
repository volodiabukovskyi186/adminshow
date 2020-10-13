import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsFiltersFormComponent } from './reviews-filters-form.component';

describe('ReviewsFiltersFormComponent', () => {
  let component: ReviewsFiltersFormComponent;
  let fixture: ComponentFixture<ReviewsFiltersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsFiltersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
