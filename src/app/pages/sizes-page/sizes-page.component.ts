import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PagesService} from '../pages.service';
import {WeightService} from '../localization/services/weight.service';
import {SelectedService} from '../selected/services/selected.service';
import {LanguageService} from '../../modules/localization/language/language.service';
import {BreadcrumbsService} from '../../core/breadcrumbs.service';
import {ToastrService} from 'ngx-toastr';
import {Event, NavigationEnd, Router} from '@angular/router';
import {LanguageService as Lang} from '../../core/language.service';
import {CustomersService} from '../customers/services/customers.service';
import {BasePage} from '../@core';
import {SizesServiceService} from './services/sizes-service.service';

@Component({
  selector: 'app-sizes-page',
  templateUrl: './sizes-page.component.html',
  styleUrls: ['./sizes-page.component.scss']
})
export class SizesPageComponent  extends BasePage implements OnInit, OnChanges {

  public arrSelected: Array<any>;
  public selected: any;
  public alldata: any;
  public arrSizes: any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public langService: LanguageService,
              public breadcrumbs: BreadcrumbsService,
              protected toastr: ToastrService,
              public router: Router,
              public lang: Lang,
              private sizesService: SizesServiceService,
  ) {
    super(pages);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      }
    });

  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.initTranslate();
    this.getLangList();
    this.getSizes();
  }

  public ngOnChanges(changes: SimpleChanges) {}

  public initTranslate(): void {
    this.lang.translate
        .get([
          'dashboard.dashboard',
          'size.sizes',
        ])
        .subscribe((tr: any) => {
          this.breadcrumbs.breadcrumbs = [
            {link: '', title: tr['dashboard.dashboard']},
            {link: 'sizes', title: tr['size.sizes']},
          ];
        });
  }


  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  }

  getSizes(): void {
    this.sizesService.getSizes().subscribe(data => {
      this.arrSizes = data.data;
    });
  }

  edit(i) {
    this.selected = i;
    this.openForm();
  }

  save = () => {
  if (!this.selected.id) {
      const newSizes = {
      group_id: this.selected.group_id,
      sort_order: this.selected.sort_order,
      description: [
        {
          id: this.selected.id,
          name : this.selected.descriptions[0].name,
          lang_id : 1
        },
        {
          id: this.selected.id,
          name : this.selected.descriptions[1].name,
          lang_id : 2
        },
        {
          id: this.selected.id,
          name : this.selected.descriptions[2].name,
          lang_id : 3
        },
        {
          id: this.selected.id,
          name : this.selected.descriptions[3].name,
          lang_id : 4
        },
      ]
    };
      this.sizesService.createSize(newSizes).subscribe(this.putHandler);
  } else {
      const newSizes = {
        group_id: this.selected.group_id,
        sort_order: this.selected.sort_order,
        description: [
          {
            id: this.selected.id,
            name : this.selected.descriptions[0].name,
            lang_id : 1
          },
          {
            id: this.selected.id,
            name : this.selected.descriptions[1].name,
            lang_id : 2
          },
          {
            id: this.selected.id,
            name : this.selected.descriptions[2].name,
            lang_id : 3
          },
          {
            id: this.selected.id,
            name : this.selected.descriptions[3].name,
            lang_id : 4
          },
        ]
      };
     this.sizesService.updateSize(newSizes, this.selected.id).subscribe(this.postHandler);
    }
  }

  plus = () => {
    this.sizesService.initEmptySizeForm();
    this.selected = this.sizesService.selected;
    this.openForm();
  }
  deleteSize(selected:any): void {
    this.sizesService.deleteSize(selected.id).subscribe(data => {this.getSizes(); });
  }

  putHandler = () => {
    this.getSizes();
    this.closeForm();

    this.toastr.success("SIZE UPDATED");
  }

  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.getSizes();
    this.closeForm();

    this.toastr.success("SIZE ADDED");
  }


  //#region pagination

  pageEvent(event): void {
    // this.selectedService.data.count = event.length;
    // this.selectedService.data.take = event.pageSize;
    // this.selectedService.data.skip = event.pageSize * event.pageIndex;
    // this.getSelectedProducts();
  }
}
