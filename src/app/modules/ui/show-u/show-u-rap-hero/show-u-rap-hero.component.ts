import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-show-u-rap-hero",
  templateUrl: "./show-u-rap-hero.component.html",
  styleUrls: ["./show-u-rap-hero.component.scss"]
})
export class ShowURapHeroComponent implements OnInit {
  @Input() isRapLogo: boolean = true;
  @Input() isShowULogo: boolean = true;
  @Input() poweredTitle: string = "Project Solution";
  @Input() poweredLink: string = "http://prsolution.com.ua/";
  @Input() title: string = "Raisins Admin Panel for Show U";
  @Input() labelPowered: string = "Powered by";

  constructor() {}

  ngOnInit(): void {}
}
