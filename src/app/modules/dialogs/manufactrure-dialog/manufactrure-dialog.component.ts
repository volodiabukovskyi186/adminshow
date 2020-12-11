import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogData} from '../../../pages/manufacturer-page/manufacturer-page.component';

@Component({
  selector: 'app-manufactrure-dialog',
  templateUrl: './manufactrure-dialog.component.html',
  styleUrls: ['./manufactrure-dialog.component.scss']
})
export class ManufactrureDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ManufactrureDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    // console.log(this.contactData);
  }
  closeDialog() {

  }
  close(value:boolean):void{
    this.dialogRef.close(value);
  }

}
