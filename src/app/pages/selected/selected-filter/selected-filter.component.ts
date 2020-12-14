import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../../orders/services/order.service';
import {environment} from '../../../../environments/environment';
import {SearchService} from '../../../modules/ui/rap/search/services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-selected-filter',
  templateUrl: './selected-filter.component.html',
  styleUrls: ['./selected-filter.component.scss']
})
export class SelectedFilterComponent implements OnInit {
  @Output() orderFiltersFormData = new EventEmitter();
  public orderFiltersForm: FormGroup;

    public selectedvalue = '';
    public isActiveResults = false;
    public host = environment.host;
    public isPressEnter: boolean;
    private searchText: string;
    public time = 500;
    public timer: any;

    constructor(
                public searchService: SearchService,
                private router: Router,) {}

  ngOnInit(): void {
    this.generateOrderFiltersForm();
  }
  public generateOrderFiltersForm(): void {
    this.orderFiltersForm = new FormGroup({
      date_start: new FormControl('', []),
      date_end: new FormControl('', []),
      stuff: new FormControl('', []),

    });
  }
    public onInput(e): void {

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            let v: string = e.target.value;
            this.selectedvalue = v;
            if (v.length < 3) {
                return this.isActiveResults = false;
            }

            this.searchText = v;
            this.searchService.search(v).subscribe(this.searchHandler);

        }, this.time)
    }

    searchHandler = data => {
        this.searchService.list = data.data;
        this.isActiveResults = !!this.searchService.list.length;

        console.log(this.searchService.list);
    }

    public pressEnter(event): void {
        console.log(event);
    }

    public closeSearchList(): void {
        this.isActiveResults = false;
        // console.log(this.isActiveResults);
    }

    public selectProduct(selectedProductId: number, selectedProductName: string): void {
        this.isActiveResults = false;
        this.selectedvalue = selectedProductName;
        this.orderFiltersForm.get('stuff').setValue(selectedProductId);
        console.log(this.orderFiltersForm.value);
    }


  public filterClientOrders(): void {
    this.orderFiltersFormData.emit(this.orderFiltersForm.value);
  }

}
