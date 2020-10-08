import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LanguageService as LocalizationLang} from "../../language/language.service";
// import {LanguageService} from "../../../../core/language.service";
import {ILanguage, LanguageService} from "src/app/modules/localization/language/language.service";
import {LocalizationServicesService} from "../../../../pages/localization/services/localization-services.service";
import {IOrderStatusUp} from "../../interfaces/order-status-interfaces";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

@Component({
    selector: 'app-order-status-form',
    templateUrl: './order-status-form.component.html',
    styleUrls: ['./order-status-form.component.scss']
})
export class OrderStatusFormComponent implements OnInit {
    @Input() selectedOrder;
    @Output() orderStatusUp: EventEmitter<any> = new EventEmitter();
    arrOrders:Array<any>
    constructor(public languageService: LocalizationLang,
                public langService: LanguageService,
                public localizeServ: LocalizationServicesService) {
    }
    ngOnInit(): void {
        this.sub()
        this.getOrderStatus()
    }
    sub():void{
        this.localizeServ.bSubject.subscribe(data=>{
           this.selectedOrder=data;
        })
        console.log(this.selectedOrder)
    }
    addChanges(): void {
        this.orderStatusUp.emit({ selectedOrder: this.selectedOrder })
    }
    getOrderStatus():void{
        this.localizeServ.getOrderStatus().subscribe(data=>{
            this.arrOrders=data.data;
            console.log(this.arrOrders)
        })
    }
    public statusCodes = {
        "1": {
            name: 'statusCodes.done',
            color: '#42996F'
        },
        "2": {
            name: 'statusCodes.inProgress',
            color: '#ffff00'
        },
        "3": {
            name: 'statusCodes.canceled',
            color: '#ff0000'
        },
        "4": {
            name: 'statusCodes.sent',
            color: '#636363'
        }
    }
    public langShortTitle = {
        "1": {
            title: 'settings.settingsLangShortTitleEng'
        },
        "2": {
            title: 'settings.settingsLangShortTitleUa'
        },
        "3": {
            title: 'settings.settingsLangShortTitleRus'
        },
        "4": {
            title: 'settings.settingsLangShortTitlePl'
        }
    }

}
