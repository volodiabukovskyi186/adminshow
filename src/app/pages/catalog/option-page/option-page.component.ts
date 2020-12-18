import {Component, OnInit} from '@angular/core';
import {BasePage} from '../../@core';
import {PaginationPage} from 'src/app/modules/ui/rap/pagination/pagination-page';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ToastrService} from 'ngx-toastr';
import {BreadcrumbsService} from 'src/app/core/breadcrumbs.service';
import {PagesService} from '../../pages.service';
import {OptionService} from 'src/app/modules/catalog/option/services/option.service';
import {LanguageService} from 'src/app/modules/localization/language/language.service';
import {OptionFormService} from 'src/app/modules/catalog/option/services/option-form.service';
import {IOption} from 'src/app/modules/catalog/option/interfaces';
import {fadeScale} from 'src/app/modules/ui/animations';
import {LanguageService as Lang} from 'src/app/core/language.service';
import {RoleService} from 'src/app/core/auth/models/role.service';
import {Router, NavigationEnd, Event} from '@angular/router';

@Component({
    animations: [fadeScale],
    selector: 'app-option-page',
    templateUrl: './option-page.component.html',
    styleUrls: ['./option-page.component.scss']
})
export class OptionPageComponent extends BasePage
    implements OnInit, PaginationPage {
    selected;
    selectedValue;


    constructor(
        protected ngxService: NgxUiLoaderService,
        protected toastr: ToastrService,
        public breadcrumbs: BreadcrumbsService,
        public pages: PagesService,
        public option: OptionService,
        public optionForm: OptionFormService,
        public langService: LanguageService,
        public roleService: RoleService,
        public lang: Lang,
        private router: Router
    ) {
        super(pages);
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.getList();
            }
        });
    }

    userRoleId: number;
    userRoleStatus: boolean = false;

    ngOnInit(): void {
        super.initPagesSettings();
        super.initPanelButton();

        this.breadcrumbs.breadcrumbs = [
            {link: '', title: 'Dashboard'},
            {link: 'option', title: 'Option'},
        ];

        this.getLangList();
        this.getList();
        this.initTranslate();
        this.getUserByTokin();
    }

    getUserByTokin(): void {
        this.roleService.getByToken().subscribe(data => {
            this.userRoleId = data.data.user.role_id;
            if (this.userRoleId == 1) {
                this.userRoleStatus = true;
                this.pages.panelButtonSettings.plus = true;
            } else {
                this.pages.panelButtonSettings.plus = false;
            }
        });
    }

    initTranslate() {
        this.lang.translate
            .get([
                'dashboard.dashboard',
                'MENU.catalog.options',
            ])
            .subscribe((tr: any) => {
                this.breadcrumbs.breadcrumbs = [
                    {link: '', title: tr['dashboard.dashboard']},
                    {link: 'option', title: tr['MENU.catalog.options']},
                ];
            });
    }

    getList() {
        this.ngxService.start();
        this.option.getList().subscribe(this.getListHandler);

    }

    getListHandler = (data) => {
        this.ngxService.stopAll();
        this.option.data = data;

    };

    getLangList() {
        this.ngxService.start();
        this.langService.getLangs().subscribe(this.getLangListHandler);
    }

    getLangListHandler = (data) => {
        this.ngxService.stopAll();
        this.langService.languages = data;

        this.optionForm.initDescription(this.langService.languages.data);
    };
    // console.log("ADD/UPDATE", this.optionForm.model);
    //
    // // THIS SHOULD NOT BE HERE ! ! !
    // let c = this.optionForm.model;
    //
    // let data = {
    //   type: c.type,
    //   sort_order: c.sort_order,
    //   status: c.status,
    //   description: [],
    // };
    // if (c.id != null) {
    //   c.description.forEach((d) => {
    //     data.description.push({
    //       id: d.id,
    //       lang_id: d.lang_id,
    //       name: d.name,
    //     });
    //   });
    //   this.option.put(data, c.id).subscribe(this.putHandler);
    // } else {
    //   c.description.forEach((d) => {
    //     data.description.push({
    //       lang_id: d.lang_id,
    //       name: d.name,
    //     });
    //   });
    //   this.option.post(data).subscribe(this.postHandler);
    // }

    save = () => {
        const option = {
            type: this.selected.type,
            sort_order: this.selected.sort_order,
            status: this.selected.status,
            description: [
                {
                    id: 1,
                    lang_id: 1,
                    name: this.selected.description[0].name
                },
                {
                    id: 2,
                    lang_id: 2,
                    name: this.selected.description[1].name
                },
                {
                    id: 3,
                    lang_id: 3,
                    name: this.selected.description[2].name
                },
                {
                    id: 4,
                    lang_id: 4,
                    name: this.selected.description[3].name
                }
            ]
        };
        if (this.selected.id) {
            this.option.put(option, this.selected.id).subscribe(this.putHandler);
        } else {
            this.option.post(option).subscribe(this.postHandler);
        }

        // this.ngxService.start();
    };

    postHandler = (data) => {
        this.ngxService.stopAll();
        this.option.data.data.push(data.data);
        this.option.data.count++;
        this.closeForm();
        this.toastr.success('option ADDED');
    };

    putHandler = (data) => {
        this.ngxService.stopAll();
        this.closeForm();
        this.toastr.success('option UPDATED ^_^');
    };

    plus = () => {
        this.formTitle = 'Add option';
        this.optionForm.initEmptyModel();
        this.optionForm.initDescription(this.langService.languages.data);

        const option = {
            type: '',
            sort_order:'',
            status: '',
            description: [
                {
                    id: 1,
                    lang_id: 1,
                    name: ''
                },
                {
                    id: 2,
                    lang_id: 2,
                    name: ''
                },
                {
                    id: 3,
                    lang_id: 3,
                    name: ''
                },
                {
                    id: 4,
                    lang_id: 4,
                    name:''
                }
            ]
        };


        this.selected = option;
        this.openForm();

    };

//#endregion

    formTitle = 'Add option';

    edit(option: IOption) {
        this.selected = option;

        this.formTitle = `Edit ${option.description[0].name}`;
        this.optionForm.initByModel(option, this.langService.languages.data);
        this.openForm();

    }
    deleteOption(id: number): void {
        this.option.deleteOption(id).subscribe(data => {
            this.getList();
        });
    }


    pageEvent(event): void {
        this.option.data.count = event.length;
        this.option.data.take = event.pageSize;
        this.option.data.skip = event.pageSize * event.pageIndex;
        this.getList();
    }

//#region pagination

    pageToHandler(page: number): void {
        this.option.page = page;
    }

    pagePrevHandler(): void {
        this.option.page--;
    }

    pageNextHandler(): void {
        this.option.page++;
    }

    pageChangedHandler(): void {
        this.getList();
        window.scrollTo(0, 0);
    }

    Math = Math;

//#endregion
}
