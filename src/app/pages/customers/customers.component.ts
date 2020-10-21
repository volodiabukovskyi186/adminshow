import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";
import {Angular5Csv} from "angular5-csv/dist/Angular5-csv";
// import {
//   ManufacturerService,
//   IManufacturer,
// } from "src/app/modules/manufacturer/manufacturer.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { changeValueHighlight } from "src/app/modules/ui/animations";
// import { ManufacturerFormService } from "src/app/modules/manufacturer/manufacturer-form.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { CustomersService } from '../customers/services/customers.service';
import { ICustomer, ICustomerPostData } from '../customers/interfaces/customer';
import { UserService } from '../../modules/user/user.service';

@Component({
  animations: [changeValueHighlight],
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent extends BasePage implements OnInit {
  // editItem: IManufacturer = null;
  customerI: ICustomer;
  customerFormData: any;
  public currentUserId: number;
  public sendCustomerEditableData;
  selected:any;
  arrCustomers:any;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public customersService: CustomersService,
    //public manufacturer: ManufacturerService,
    public langService: LanguageService,
    // public manufacturerForm: ManufacturerFormService,
    public lang: Lang,
    public userService: UserService
  ) {
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    // this.breadcrumbs.breadcrumbs = [
    //   { link: "", title: "Dashboard" },
    //   { link: "/customers", title: "Customers" },
    // ];
    // this.getLangList();
    // this.getList();
    // this.initTranslate();

    this.userService.getByToken().subscribe((res) => {
      //this.currentUserId = res.data.user.id;

    });
    this.pages.panelButtonSettings.download = true;

    this.getCustomers();

  }

  getCustomers():void{
      this.customersService.getCustomers().subscribe(data=>{
        this.arrCustomers=data;
        console.log(this.arrCustomers)
      })
  }
  editCustomers(i) {
    this.selected= i;
    this.openForm();
    this.pages.panelButtonSettings.download = false;
  }

  save = () => {
    this.pages.panelButtonSettings.download = true;
    const customer={
    subscriptions_type_id: this.selected.subscriptions_type_id,
		email:this.selected.email ,
		first_name: this.selected.first_name,
		last_name: this.selected.last_name,
		telephone: this.selected.telephone
    }

    if (this.selected.id !== undefined) {
      this.customersService.editCustomerInfo(this.selected, this.selected.id).subscribe((res) => {
        this.putHandler(res);
        this.customersService.getCustomers();
        this.getCustomers();
      });     
    }
    else{
        customer.subscriptions_type_id=1;
        this.customersService.createCustomerInfo(customer).subscribe((res) => {
        this.putHandler(res);
        this.customersService.getCustomers();
        this.getCustomers();
      });
    }


 
    console.log(customer)
    // this.ngxService.start();
    this.pages.panelButtonSettings.download = false;
    this.pages.panelButtonSettings.download = true;
    this.pages.panelButtonSettings.toggleFilter=false;
  };

  deleteStatus(item){
      this.customersService.deleteCustomers(item).subscribe(data=>{
        this.getCustomers();
      })
  }

  download=()=>{
    new Angular5Csv(this.arrCustomers.data, 'Users');
  }
  initTranslate() {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.customers.customers",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "customers", title: tr["MENU.customers.customers"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.customersService.getCustomers().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.customersService.customer = data;
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;

    //this.manufacturerForm.initDesc(this.langService.languages.data);
  };
  
  customersFormData(event) {
    this.customerFormData = event;

    this.sendCustomerEditableData = {
      subscriptions_type_id: 1,
      email: this.customerFormData.customerEmail,
      first_name: this.customerFormData.customerFirstName,
      last_name: this.customerFormData.customerLastName,
      telephone: this.customerFormData.customerPhone
    }
  }

  //#region override

  edit(i: ICustomer) {
    this.currentUserId = i.id;
    this.selected=i;
    this.pages.panelButtonSettings.download = false;
    //this.manufacturerForm.initBy(i, this.langService.languages.data);
    this.openForm();
    // console.log(this.oneCustomer);
  }


  cancel=()=>{
    this.pages.panelButtonSettings.download = true;
    this.closeForm();
    this.pages.panelButtonSettings.rightToggle = false;
  }


  postHandler = (data: { data: ICustomer }) => {
    this.ngxService.stopAll();

    this.customersService.customer.data.push(data.data);
    this.customersService.customer.count++;

    this.closeForm();
    this.toastr.success("CUSTOMER ADDED");
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("CUSTOMER UPDATED ^_^");
  };

  plus = () => {
    this.pages.panelButtonSettings.download = false;
    // this.manufacturerForm.initEmptyCategory();
    // this.manufacturerForm.initDesc(this.langService.languages.data);
    // this.openForm();

    this.customersService.initEmptyCustomerForm()
    this.selected = this.customersService.selected;
    this.openForm();
  };

  //#endregion

  //#region pagination

  pageToHandler(page: number): void {
    this.customersService.page = page;
  }
  pagePrevHandler(): void {
    this.customersService.page--;
  }
  pageNextHandler(): void {
    this.customersService.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;

  //#endregion
}
