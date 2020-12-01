import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { CategoryService } from "src/app/modules/catalog/category/category.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { changeValueHighlight } from "src/app/modules/ui/animations";
import { PaginationPage } from "src/app/modules/ui/rap/pagination/pagination-page";
import { ICategory } from "src/app/modules/catalog/category/interfaces";
import { CategoryFormService } from "src/app/modules/catalog/category/category-form.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";
import { BasePage } from "src/app/pages/@core";
import { PagesService } from "src/app/pages/pages.service";
import { RoleService } from 'src/app/core/auth/models/role.service';

@Component({
  animations: [changeValueHighlight],
  selector: "app-category-page",
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.scss"],
})
export class CategoryPageComponent extends BasePage implements OnInit, PaginationPage, OnDestroy {
  public routerSubscription;
  public displayAllCaterories;
  public userRoleId: number;
  public userRoleStatus:boolean = false;
  public editItem: ICategory = null;
  public msgAdded: string = "Category successfully added";
  public msgUpdated: string = "Category successfully updated";
  public msgDeleted: string = "Category successfully deleted";

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public category: CategoryService,
    public categoryForm: CategoryFormService,
    public langService: LanguageService,
    public lang: Lang,
    private _title: Title,
    private _router: Router,
    private roleService:RoleService
  ) {
    super(pages);
  }

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.getLangList();
    this.getList(); 
    this.initTranslate();
    this.routerSubscription = this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.initTranslate();
        this.getList();
      }
    });
    this.getUserByTokin();
  }

  public getUserByTokin(): void {
    this.roleService.getByToken().subscribe(data => {
      this.userRoleId = data.data.user.role_id;
      if(this.userRoleId === 1) {
        this.userRoleStatus = true;
        this.pages.panelButtonSettings.plus = true;
      } else {
        this.pages.panelButtonSettings.plus = false;
      }  
    })
  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "category.categories",
        "category.category",
        "category.msgDeleted",
        "category.msgUpdated",
        "category.msgAdded",
        "dashboard.dashboard",
        "APP.TITLE",
      ])
      .subscribe((tr: any) => {
        this.msgAdded = tr["category.msgAdded"];
        this.msgDeleted = tr["category.msgDeleted"];
        this.msgUpdated = tr["category.msgUpdated"];
        this._title.setTitle(
          `${tr["category.categories"]} | ${tr["APP.TITLE"]}`
        );
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "category", title: tr["category.categories"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.category.getList().subscribe(this.getListHandler);
    this.getCategories();
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.category.category = data;
  };

  getCategories(): void {
    this.category.getAllCategories().subscribe((res) => {
      //this.getListHandler(res);
      console.log(res);
      this.displayAllCaterories = this.toArray(res.data, []);
      console.log('displayAllCaterories', this.displayAllCaterories);
    })
  }

  public toArray(nodes: any[], arr: any[]) {
    if (!nodes) {
      return [];
    }

    if (!arr) {
      arr = [];
    }

    for (var i = 0; i < nodes.length; i++) {
      arr.push(nodes[i]);
      this.toArray(nodes[i].sub, arr);
    }

   return arr;
  }

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
    this.categoryForm.initDesc(this.langService.languages.data);
  };

  //
  updateStatus(item: ICategory) {
    this.category
      .updateStatus(item.id, item.status == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editItem = item;
  }

  updateStatusHandler = (data) => {
    this.category.updateStatusInList(
      this.editItem.id,
      this.editItem.status == 0 ? 1 : 0
    );
  };

  highlightIndex: number = 0;

  //#region

  //#region onSubmit($event)

  onSubmit($event) {}

  //#region override

  save = () => {
    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.categoryForm.category;

    let data = {
      parent_id: c.parent_id,
      image_id: c.image_id,
      sort_order: c.sort_order,
      status: c.status,
      description: [],
    };
    if (c.id != null) {
      c.description.forEach((d) => {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          name: d.name,
          description: d.description,
        });
      });
      this.category.put(data, c.id).subscribe(this.putHandler);
    } else {
      c.description.forEach((d) => {
        data.description.push({
          lang_id: d.lang_id,
          name: d.name,
          description: d.description,
        });
      });
      this.category.post(data).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data: { data: ICategory }) => {
    this.ngxService.stopAll();

    this.category.category.data.push(data.data);
    this.category.category.count++;

    this.closeForm();
    this.toastr.success(this.msgAdded);
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success(this.msgUpdated);
  };

  plus = () => {
    this.categoryForm.initEmptyCategory();
    this.categoryForm.initDesc(this.langService.languages.data);
    this.openForm();
  };

  //#endregion

  edit(i): void {
    this.categoryForm.initBy(i, this.langService.languages.data);
    this.openForm();
  }

  pageEvent(event): void {
    this.category.category.count = event.length;
    this.category.category.take = event.pageSize;
    this.category.category.skip = event.pageSize * event.pageIndex;
    this.getList();
  }
  //#region pagination

  pageToHandler(page: number): void {
    this.category.page = page;
  }
  pagePrevHandler(): void {
    this.category.page--;
  }
  pageNextHandler(): void {
    this.category.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;

  //#region pagination

  //#endregion
}
