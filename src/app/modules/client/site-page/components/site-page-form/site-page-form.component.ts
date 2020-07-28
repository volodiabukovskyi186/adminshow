import { Component, OnInit, Input } from '@angular/core';
import { ISitePage } from '../../site-page.service';

@Component({
  selector: 'app-site-page-form',
  templateUrl: './site-page-form.component.html',
  styleUrls: ['./site-page-form.component.scss']
})
export class SitePageFormComponent implements OnInit {
  @Input() model: ISitePage;
  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
