import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {LanguageService, LanguageService as LocalizationLang} from '../../../modules/localization/language/language.service';
import {LocalizationServicesService} from '../../localization/services/localization-services.service';
import {FormControl} from '@angular/forms';
import {SizeGroupsService} from '../../size-groups-page/services/size-groups-page.service';
import {SizesServiceService} from '../services/sizes-service.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-sizes-form',
    templateUrl: './sizes-form.component.html',
    styleUrls: ['./sizes-form.component.scss']
})
export class SizesFormComponent implements OnInit, OnDestroy {
    @Input() selected;
    // @Input() public descr: FormControl = new FormControl();

    public filteredSizes = new BehaviorSubject([]);
    public filteredSizes$ = this.filteredSizes.asObservable();
    public arrOrders: Array<any>;
    public oneOrderStatus: any;
    public arrSizeGroup = [];
    public sizeGroupsByLang = [];
    public langShortTitle = {
        '1': {
            title: 'settings.settingsLangShortTitleEng'
        },
        '2': {
            title: 'settings.settingsLangShortTitleUa'
        },
        '3': {
            title: 'settings.settingsLangShortTitleRus'
        },
        '4': {
            title: 'settings.settingsLangShortTitlePl'
        }
    };

    private destroy$: Subject<void> = new Subject<void>();

    constructor(public languageService: LocalizationLang,
                public langService: LanguageService,
                public localizeServ: LocalizationServicesService,
                private sizeGroupsService: SizeGroupsService,
                private  sizeService: SizesServiceService) {
    }

    public ngOnInit(): void {
        this.sub();
        this.getAllSizeGroup();
        this.getSizeGroupsByLang();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public sub(): void {
        this.sizeService.bSubject.subscribe(data => {
            this.selected = data;
            console.log('pp', this.selected)
        });
    }
    selectGroup(value): void {
        this.selected.group_id = value;

    }
    save = () => {
        console.log('value',   this.selected);
    }
    getAllSizeGroup(): void {
        this.sizeGroupsService.getList().subscribe(data => {
            this.arrSizeGroup = data.data;
            console.log('all', this.arrSizeGroup);

        });
    }

    public getSizeGroupsByLang(): void {
    this.sizeGroupsService.getSizeGroupsByLang()
      .pipe(takeUntil(this.destroy$))
      .subscribe((sizesData) => {
        this.sizeGroupsByLang = sizesData.data;
        this.filteredSizes.next(this.sizeGroupsByLang);

        console.log('this.sizeGroupsByLang', this.sizeGroupsByLang);
    })
  }

    // getSizeGroupsByLang(): void {
    //     this.sizeGroupsService.getSizeGroupsByLang()
    //         .subscribe((res) => {
    //             this.sizeGroupsByLang = res.data;
    //             console.log('this.sizeGroupsByLang', this.sizeGroupsByLang);
    //         })
    // }

}
