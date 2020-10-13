import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reviews-filters-form',
  templateUrl: './reviews-filters-form.component.html',
  styleUrls: ['./reviews-filters-form.component.scss']
})
export class ReviewsFiltersFormComponent implements OnInit {
  public reviewsFiltersForm: FormGroup;
  public allStatusCodes = [
    {value: 1, name: "statusCodes.new"},
    {value: 2, name: "statusCodes.rejected"},
    {value: 3, name: "statusCodes.approved"},
  ];

  constructor() { }

  ngOnInit(): void {
    this.generateReviewsFiltersForm();
  }

  generateReviewsFiltersForm() {
    this.reviewsFiltersForm = new FormGroup({
      dateFrom: new FormControl('', []),
      dateTo: new FormControl('', []),
      status: new FormControl('', [])
    })
  }

  public onChange(event) {
    this.reviewsFiltersForm.get('status').setValue(event);
  }
}
