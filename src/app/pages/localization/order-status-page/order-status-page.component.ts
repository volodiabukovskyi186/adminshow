import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PagesService} from "../../pages.service";
import {BasePage} from "../../@core";
import {LocalizationServicesService} from "../services/localization-services.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {IOrderStatusUp} from "../../../modules/localization/interfaces/order-status-interfaces";
import {FormControl} from "@angular/forms";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Angular5Csv} from "angular5-csv/dist/Angular5-csv";
import {BreadcrumbsService} from "../../../core/breadcrumbs.service";

@Component({
    selector: 'app-order-status-page',
    templateUrl: './order-status-page.component.html',
    styleUrls: ['./order-status-page.component.scss']
})
export class OrderStatusPageComponent extends BasePage implements OnInit {
    arrStatus: Array<any>
    selectedOrder: any;
    alldata:any;

    public descr: FormControl = new FormControl();


    constructor(public pages: PagesService,
                public localizationService: LocalizationServicesService,
                public langService: LanguageService,
                protected ngxService: NgxUiLoaderService,
                public breadcrumbs: BreadcrumbsService,
    ) {
        super(pages);

    }

    ngOnInit(): void {
        super.initPagesSettings();
        super.initPanelButton();
        this.getStatus();
        this.getLangList();
        this.breadcrumbs.breadcrumbs = [
            { link: "", title: "Dashboard" },
            { link: "order_status", title: "Order status" },
        ];
    }



    test(){
        debugger;
        new Angular5Csv(this.arrStatus , 'My Report');
    }



    getLangList() {
        // this.ngxService.start();
        this.langService.getLangs().subscribe(this.getLangListHandler);
    }

    getLangListHandler = (data) => {
        // this.ngxService.stopAll();
        this.langService.languages = data;
        // this.categoryForm.initDesc(this.langService.languages.data);
    };

    getStatus(): void {
        this.localizationService.getOrderStatus().subscribe(
            data => {
            this.arrStatus = data.data;
            this.alldata=data;
            this.localizationService.data=data;
            console.log( this.alldata)
        })

    }

    deleteStatus(order): void {
        if(order.name!=='New') {
            this.localizationService.deleteOrderStatus(order.id).subscribe(data => {
                this.getStatus()
            })
        }
        else {
            console.log('you cant delete this status ')
        }

    }

    edit(i) {
        this.selectedOrder = i;
        this.openForm();

    }

    save = () => {
        const updateOrder = {
            name: this.selectedOrder.descriptions[0].dectiption,
            description: this.selectedOrder.descriptions,
        }
        console.log(updateOrder)
        if (this.selectedOrder.id !== undefined) {
            this.localizationService.editOrderStaus(this.selectedOrder.id, updateOrder).subscribe(data => {
            })
            this.getStatus()
        }
        else {
            this.localizationService.addNewOrderStatus(this.selectedOrder.id, updateOrder).subscribe(data => {
                this.getStatus()

            })

        }
        this.closeForm();


    }
    plus = () => {
        this.localizationService.initEmptyOrderStatus();
        this.selectedOrder = this.localizationService.selectedOrder;
        this.openForm();
    };

    postHandler = (data) => {
        // this.ngxService.stopAll();
        this.localizationService.data.data.push(data.data);
        this.localizationService.data.count++;
        this.closeForm();
        // this.toastr.success("option ADDED");
    };
    // getListHandler = (data) => {
    //     this.ngxService.stopAll();
    //     this.localizationService.data = data;
    // };

    //#region pagination

    pageToHandler(page: number): void {
        this.localizationService.page = page;
    }
    pagePrevHandler(): void {
        this.localizationService.page--;
    }
    pageNextHandler(): void {
        this.localizationService.page++;
    }
    pageChangedHandler(): void {
       this.getStatus();;
        window.scrollTo(0, 0);
    }
    Math = Math;

//#endregion



}
