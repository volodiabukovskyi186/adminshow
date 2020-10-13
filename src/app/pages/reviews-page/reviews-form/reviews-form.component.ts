import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reviews-form',
  templateUrl: './reviews-form.component.html',
  styleUrls: ['./reviews-form.component.scss']
})
export class ReviewsFormComponent implements OnInit {
  @Input() review;
  @Input() langs;

  public monthNames: any[] = [{
    0: 'months.Jan',
    1: 'months.Feb',
    2: 'months.Mar',
    3: 'months.Apr',
    4: 'months.May',
    5: 'months.Jun',
    6: 'months.Jul',
    7: 'months.Aug',
    8: 'months.Sep',
    9: 'months.Oct',
    10: 'months.Nov',
    11: 'months.Dec'
  }];

  // public statusCodes = {
  //   "1": {
  //     name: 'statusCodes.new',
  //     backgroundColor: '#3498DB'
  //   },
  //   "2": {
  //     name: 'statusCodes.rejected',
  //     backgroundColor: '#52BE80'
  //   },
  //   "3": {
  //     name: 'statusCodes.approved',
  //     backgroundColor: '#E74C3C '
  //   }
  // }

  public allStatusCodes = [
    {value: 1, name: "statusCodes.new"},
    {value: 2, name: "statusCodes.rejected"},
    {value: 3, name: "statusCodes.approved"},
  ];

  public reviewsForm: FormGroup;

  constructor(
    public langService: LanguageService
  ) { }

  ngOnInit(): void {
    console.log("review ====>>>>>>>>>.", this.review);

    this.generateReviewsForm();
  }

  generateReviewsForm(): void {
    this.reviewsForm = new FormGroup({
      response: new FormControl(""),
      status: new FormControl("")
    });
  }

  public modifyDateString(date, type: string) {
    let substringDate = date?.substring(0, 10);
    let t = new Date(substringDate);
  
    if (type === 'day') {
      return t.getDate();
    } else if (type === 'months') {
      return this.monthNames[0][t.getMonth()];
    } else if (type === 'year') {
      return t.getFullYear()
    }
  }

  public onChange(event) {
    this.reviewsForm.get('status').setValue(event);
  }

}
