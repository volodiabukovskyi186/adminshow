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


  ngOnChanges(changes: SimpleChanges) {

  }


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
      console.log('sizes===>', data);
      this.arrSizes = data.data;
    });
  }

  edit(i) {
    this.selected = i;
    console.log('this.selected ', this.selected);
    this.openForm();
  }

  save = () => {
  console.log('this.selected', this.selected);
  if (!this.selected.id) {
      const newSizes = {
      group_id: this.selected.group_id,
      sort_order: this.selected.sort_order,
      description: [
        {
          name : this.selected.descriptions[0].name,
          lang_id : 1
        },
        {
          name : this.selected.descriptions[1].name,
          lang_id : 2
        },
        {
          name : this.selected.descriptions[2].name,
          lang_id : 3
        },
        {
          name : this.selected.descriptions[3].name,
          lang_id : 4
        },
      ]
    };
      this.sizesService.createSize(newSizes).subscribe(data => {this.getSizes(); });
      console.log('Newsizes', newSizes);
  } else {
      const newSizes = {
        group_id: this.selected.group_id,
        description: [
          {
            name : this.selected.descriptions[0].name,
            lang_id : 1
          },
          {
            name : this.selected.descriptions[1].name,
            lang_id : 2
          },
          {
            name : this.selected.descriptions[2].name,
            lang_id : 3
          },
          {
            name : this.selected.descriptions[3].name,
            lang_id : 4
          },
        ]
      };
     this.sizesService.updateSize(newSizes, this.selected.id).subscribe(data => {this.getSizes(); });
    }
  }
  plus = () => {
    this.sizesService.initEmptySizeForm();
    this.selected = this.sizesService.selected;
    console.log('this.selected ', this.selected );
    this.openForm();
  }
  deleteSize(selected:any): void {
    this.sizesService.deleteSize(selected.id).subscribe(data => {this.getSizes(); });
  }

  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.closeForm();
    // this.toastr.success("option ADDED");
  }


  //#region pagination

  pageEvent(event): void {
    // this.selectedService.data.count = event.length;
    // this.selectedService.data.take = event.pageSize;
    // this.selectedService.data.skip = event.pageSize * event.pageIndex;
    // this.getSelectedProducts();
  }
}
