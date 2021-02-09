import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
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
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  animations: [changeValueHighlight],
  selector: "app-category-page",
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.scss"],
})
export class CategoryPageComponent extends BasePage implements OnInit, PaginationPage, OnDestroy {
  @ViewChild(CategoryFormComponent) categoryFormComponent: CategoryFormComponent;

  public routerSubscription;
  public displayAllCaterories;
  public userRoleId: number;
  public userRoleStatus:boolean = false;
  public editItem: ICategory = null;
  public msgAdded: string = "Category successfully added";
  public msgUpdated: string = "Category successfully updated";
  public msgDeleted: string = "Category successfully deleted";
  public descriptionsCategotyToSend: any;
  public selectedCategory: any;
  public sendUpdatedCategories: any;
  public isCategoryAdded: boolean = false;
  public isCategoryEdited: boolean = false;
  public userCategories: any;
  public highlightIndex: number = 0;


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
   //this.routerSubscription.unsubscribe();
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.getLangList();
    this.getList(); 
    //this.initTranslate();
    this.routerSubscription = this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.initTranslate();
        this.getList();
      }
    });
    this.getUserByTokin();
    //this.getUserCategories();
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

  public getList(): void {
    this.ngxService.start();
    this.category.getList().subscribe(this.getListHandler);
    this.getUserCategories();
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.category.category = data;
    console.log('this.category.category ===== >>>>', this.category.category);
  };

  //public getCategories(): void {
    //this.category.getAllCategories().subscribe((res) => {
      //this.getListHandler(res);
      //console.log('res ===== >>>>>', res);

      //this.displayAllCaterories = this.toArray(res.data, []);
    //})
  //}

  // public toArray(nodes: any[], arr: any[]) {
  //   if (!nodes) {
  //     return [];
  //   }

  //   if (!arr) {
  //     arr = [];
  //   }

  //   for (var i = 0; i < nodes.length; i++) {
  //     arr.push(nodes[i]);
  //     this.toArray(nodes[i].sub, arr);
  //   }

  //  return arr;
  // }

  getUserCategories(): void {
    this.category.getCategories().subscribe((resp) => {
      this.userCategories = resp.data;
    })
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

    //debugger;
  }

  updateStatusHandler = (data) => {
    this.category.updateStatusInList(
      this.editItem.id,
      this.editItem.status == 0 ? 1 : 0
    );
  };

  //#region

  //#region onSubmit($event)

  onSubmit(event) {
    console.log('event ==== >>>>', event);
    
    this.descriptionsCategotyToSend = event.description.map((category) => {
      return {
        id: category.id,
        lang_id: category.lang_id,
        name: category.name,
        description: category.description
      }
    })

    this.sendUpdatedCategories = {
      parent_id: event.parent_id,
      image_id: event.image_id,
      sort_order: event.sort_order,
      status: event.status,
      description: this.descriptionsCategotyToSend
    }
  }

  //#region override

  save = () => {
    // THIS SHOULD NOT BE HERE ! ! !
    this.categoryFormComponent.submitForm();
    //console.log('this.categoryFormComponent.submitForm() ===== >>>.', this.categoryFormComponent.submitForm());
    
    if (this.selectedCategory?.id && this.isCategoryEdited) {
      //data.description = this.descriptionsCategotyToSend;
      //c.description.forEach((d) => {
        //data.description.push(
          // {
          //   id: d.id,
          //   lang_id: d.lang_id,
          //   name: d.name,
          //   description: d.description,
          // }
        //);
      //});
      this.category.put(this.sendUpdatedCategories, this.selectedCategory.id).subscribe(this.putHandler);
    } else {
      let c = this.categoryForm.category;

      let data = {
        parent_id: c.parent_id,
        image_id: c.image_id,
        sort_order: c.sort_order,
        status: c.status,
        description: [],
      };

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

    this.getList(); 

    this.closeForm();
    this.toastr.success(this.msgAdded);
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.getList(); 
    
    this.closeForm();
    this.toastr.success(this.msgUpdated);
  };

  plus = () => {
    this.isCategoryAdded = true;
    this.isCategoryEdited = false;

    this.categoryForm.initEmptyCategory();
    //this.selectedCategory = this.categoryForm.category;
    this.categoryForm.initDesc(this.langService.languages.data);
    this.openForm();
  };

  //#endregion

  public edit(i): void {
    console.log('iiiiiiiii ====== >>>>>>', i);
    this.selectedCategory = i;
    this.isCategoryEdited = true;
    this.isCategoryAdded = false;

    //this.categoryForm.initBy(i, this.langService.languages.data);
    this.openForm();
  }

  public pageEvent(event): void {
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
