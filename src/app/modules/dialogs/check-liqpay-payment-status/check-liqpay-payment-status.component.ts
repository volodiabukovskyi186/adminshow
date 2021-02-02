import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-liqpay-payment-status',
  templateUrl: './check-liqpay-payment-status.component.html',
  styleUrls: ['./check-liqpay-payment-status.component.scss']
})
export class CheckLiqpayPaymentStatusComponent implements OnInit {
  public host = environment.host;

  constructor(
    public dialogRef: MatDialogRef<CheckLiqpayPaymentStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public orderData: any,
  ) { }

  public ngOnInit(): void {
    console.log(this.orderData);
  }

  public onNoClick(): void {
    this.dialogRef.close(this.orderData);
  }

}
