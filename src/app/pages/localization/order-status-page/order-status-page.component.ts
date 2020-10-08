import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PagesService} from "../../pages.service";
import {BasePage} from "../../@core";
import {LocalizationServicesService} from "../services/localization-services.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {IOrderStatusUp} from "../../../modules/localization/interfaces/order-status-interfaces";

@Component({
    selector: 'app-order-status-page',
    templateUrl: './order-status-page.component.html',
    styleUrls: ['./order-status-page.component.scss']
})
export class OrderStatusPageComponent extends BasePage implements OnInit {
    arrStatus: Array<any>
    updateOrder: IOrderStatusUp;
    selectedOrder: any;

    constructor(public pages: PagesService,
                public localizationService: LocalizationServicesService,
                public langService: LanguageService,
    ) {
        super(pages);

    }

    ngOnInit(): void {
        super.initPagesSettings();
        super.initPanelButton();
        this.getStatus();
        this.getLangList();
        console.log(this.selectedOrder)
        // this.getList();
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
        this.localizationService.getOrderStatus().subscribe(data => {
            this.arrStatus = data.data;
            console.log(this.arrStatus)
        })
    }

    deleteStatus(order): void {
        this.localizationService.deleteOrderStatus(order.id).subscribe(data => {
            this.arrStatus = data.data;
        })
        this.getStatus()
    }

    edit(item) {
        this.selectedOrder = item;
        this.openForm();
    }

    save = () => {
        const updateOrder = {
            name: this.selectedOrder.descriptions[0].dectiption,
            description: this.selectedOrder.descriptions
        }
        if (this.selectedOrder.id !== undefined) {
            this.localizationService.editOrderStaus(this.selectedOrder.id, updateOrder).subscribe(data => {
            })
        }
        else {
            this.localizationService.addNewOrderStatus(this.selectedOrder.id, updateOrder).subscribe(data => {
            })

        }
        console.log(this.selectedOrder)
        this.getStatus()
        this.closeForm();

    }
    plus = () => {
        this.localizationService.initEmptyOrderStatus();
        this.selectedOrder = this.localizationService.selectedOrder;
        this.openForm();
    };


}
