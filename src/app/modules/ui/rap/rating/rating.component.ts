import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "rap-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"],
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 4;

  @Input() max: number = 5;

  public get value(): Array<boolean> {
    let res = [];

    for (let i = 1; i <= this.max; i++) {
      res.push(i <= this.rating);
    }

    return res;
  }

  constructor() {}

  ngOnInit(): void {}
}
