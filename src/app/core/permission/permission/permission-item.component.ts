import { Component, OnInit, Input } from '@angular/core';
import { Permission } from '../permission';

@Component({
  selector: 'app-permission-item',
  templateUrl: './permission-item.component.html',
  styleUrls: ['./permission-item.component.scss']
})
export class PermissionItemComponent implements OnInit {
  @Input() perm: Permission;

  constructor() { }

  ngOnInit(): void {
  }

}
