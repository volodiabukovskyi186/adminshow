import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-filters-form',
  templateUrl: './order-filters-form.component.html',
  styleUrls: ['./order-filters-form.component.scss']
})
export class OrderFiltersFormComponent implements OnInit {
  @Output() orderFiltersFormData = new EventEmitter();

  public orderFiltersForm: FormGroup;
  public allManufacturers;
  public allClients;

  constructor() { }

  ngOnInit(): void {
    this.generateOrderFiltersForm();
    this.getEditOrderFiltersFormFormData();
  }

  generateOrderFiltersForm() {
    this.orderFiltersForm = new FormGroup({
      dateFrom: new FormControl('', []),
      dateTo: new FormControl('', []),
      manufacturer: new FormControl('', []),
      client: new FormControl('', [])
    })
  }

  public onChange(event) {
    this.orderFiltersForm.get('manufacturer').setValue(event);
  }

  getEditOrderFiltersFormFormData(): void {
    this.orderFiltersForm.valueChanges
    .subscribe(() => this.orderFiltersFormData.emit({ 
      date_start: this.orderFiltersForm.value.dateFrom,
      date_end: this.orderFiltersForm.value.dateTo,
      manufacturer: this.orderFiltersForm.value.manufacturer,
      client: this.orderFiltersForm.value.client
    }));
  }

}
