import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/modules/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-quick-order-form',
  templateUrl: './quick-order-form.component.html',
  styleUrls: ['./quick-order-form.component.scss']
})
export class QuickOrderFormComponent implements OnInit {
  public currentUserRoleId: number;
  public managerStatusForm: FormGroup;

  @Input() selectedClientOrder;

  constructor(
    public userService: UserService
  ) { }

  public ngOnInit(): void {
    this.getUserByToken();
    this.generateManagerStatusForm();
  }

  public getUserByToken(): void {
    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;
    });
  }

  public generateManagerStatusForm(): void {
    this.managerStatusForm = new FormGroup({
      status: new FormControl('', [])
    })
  }
}
