import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BasePage} from '../@core';
import {FormControl} from '@angular/forms';
import {PagesService} from '../pages.service';
import {WeightService} from '../localization/services/weight.service';
import {LanguageService} from '../../modules/localization/language/language.service';
import {BreadcrumbsService} from '../../core/breadcrumbs.service';
import {ToastrService} from 'ngx-toastr';
import {Event, NavigationEnd, Router} from '@angular/router';
import {LanguageService as Lang} from '../../core/language.service';
import {SelectedService} from './services/selected.service';
import {CustomersService} from '../customers/services/customers.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent extends BasePage implements OnInit, OnChanges {

  public  arrSelected: Array<any>;
  public selected: any;
  public alldata: any;
  public showFilters = false;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public weightService: WeightService ,
              public selectedService: SelectedService ,
              public langService: LanguageService,
              public breadcrumbs: BreadcrumbsService,
              protected toastr: ToastrService,
              public router: Router,
              public lang: Lang,
              private customersService: CustomersService
  ) {
    super(pages);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getSelectedProducts();
      }
    });

  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.initTranslate();
    this.getSelectedProducts();
    this.getLangList();

    // this.breadcrumbs.breadcrumbs = [
    //   { link: '', title: 'Dashboard' },
    //   { link: 'unit_weight', title: 'Selected' },
    // ];
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.toggleFilter = false;
    this.pages.panelButtonSettings.download = true;
    this.pages.onTogleFilterClick = () => {
      this.showFilters = true;
      this.openForm();
    };
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.pages.panelButtonSettings.plus = false;
      this.pages.panelButtonSettings.rightToggle = true;
      this.pages.panelButtonSettings.save = false;
      this.pages.panelButtonSettings.toggleFilter = false;
    }
  }

  download = () => {
    this.selectedService.getCustomerTable().subscribe(data => {
      window.location.href = `https://${data.path}`;
    });
  }

  public initTranslate(): void {
    this.lang.translate
        .get([
          'dashboard.dashboard',
          'selected.selected',
        ])
        .subscribe((tr: any) => {
          this.breadcrumbs.breadcrumbs = [
            { link: '', title: tr['dashboard.dashboard'] },
            { link: 'selected', title: tr['selected.selected'] },
          ];
        });
  }


  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }
  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
  };

  closeForm = () => {
    this.pages.panelSettings.form = false;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = true;
  };

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };


  getSelectedProducts(filter?: any): void {
    this.selectedService.getSelectedProducts(filter).subscribe(data => {
      this.arrSelected = data.data;
      this.alldata = data;
    });
  }
  public orderFiltersFormData(filter): void {
    this.getSelectedProducts(filter);
    console.log('event===>', filter);
    this.closeForm();
  }

  deleteStatus(order): void {
    this.weightService.deleteWeight(order.id).subscribe(data => {
      this.getSelectedProducts();
    });
  }

  edit(i) {
    this.selected = i;
    this.openForm();
  }


  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.weightService.data.data.push(data.data);
    this.weightService.data.count++;
    this.closeForm();
    // this.toastr.success("option ADDED");
  } ;


  //#region pagination

  pageEvent(event): void {
    this.selectedService.data.count = event.length;
    this.selectedService.data.take = event.pageSize;
    this.selectedService.data.skip = event.pageSize * event.pageIndex;
    this.getSelectedProducts();
  }
  Math = Math;
}
