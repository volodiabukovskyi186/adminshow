import { Component, OnInit, Input } from '@angular/core';
import { ISiteMenu } from '../../site-menu.service';

@Component({
  selector: 'app-site-menu-form',
  templateUrl: './site-menu-form.component.html',
  styleUrls: ['./site-menu-form.component.scss']
})
export class SiteMenuFormComponent implements OnInit {

  @Input() model: ISiteMenu;
  @Input() title: string = "";

  constructor() {}
  ngOnInit(): void {}

}
