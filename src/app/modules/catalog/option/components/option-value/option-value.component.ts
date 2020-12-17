import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LanguageService, LanguageService as LocalizationLang} from '../../../../localization/language/language.service';
import {OptionService} from '../../services/option.service';
import {IImage} from '../../../../gallery/folder/interfaces';
import {IProdImage, ProductImagesService} from '../../../product/services/product-images.service';
import {ImagesService} from '../../../../gallery/images.service';
import {element} from 'protractor';

@Component({
    selector: 'app-option-value',
    templateUrl: './option-value.component.html',
    styleUrls: ['./option-value.component.scss']
})
export class OptionValueComponent implements OnInit, OnChanges {
    // @Input() optionValue;
    @Input() selected;
    @Input() selectedValue;

    public optionType: number;
    public optionStatus: number;
    public optionSort: number;
    public arrOptions = [];
    public allCurrentOption = [];
    public reviewId: number;
    public modalOpen = false;

    public optionValue = {
        option_id: null,
        image_id: null,
        sort_order: null,
        status: null,
        image: {
            src_mini: '',
        },
        descriptions: [
            {
                lang_id: 1,
                sort_order: 1,
                name: ''
            },
            {
                lang_id: 2,
                sort_order: 2,
                name: ''
            },
            {
                lang_id: 3,
                sort_order: 3,
                name: ''
            },
            {
                lang_id: 4,
                sort_order: 5,
                name: ''
            }
        ]
    };
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
    }
    constructor(public languageService: LocalizationLang,
                public langService: LanguageService,
                public  optionsService: OptionService,
                public image: ImagesService,
                public prodImage: ProductImagesService) {
    }

    ngOnInit(): void {
        this.getOptions();
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (this.selected) {
                this.getSelectedOptionVal();
            }
        }
    }

    public moderationOfReview(checked): void {
        this.reviewId = checked.id;
        this.selectedValue = checked;
        this.optionType = checked.option_id;
        this.optionStatus = checked.status;
        this.optionSort = checked.sort_order;
        this.optionValue.image_id = checked.image.id;
    }

    getSelectedOptionVal(): void {
        this.optionsService.getSelectedOptionValue(this.selected.id).subscribe(data => {
            this.selectedValue = this.optionValue;
            this.allCurrentOption = data.data;
        });

    }

    getOptions(): void {
        this.optionsService.getOptions().subscribe(data => {
            this.arrOptions = data.data;
        });
    }

    onChange(val): void {
        this.optionValue.option_id = val;
    }

    save(): void {
        const optionValue = {
            option_id: this.selected.id,
            image_id: this.optionValue.image_id,
            sort_order: this.optionSort,
            status: this.optionStatus,
            description: [
                {
                    id: 1,
                    lang_id: 1,
                    sort_order: this.optionSort,
                    name: this.selectedValue?.descriptions[0].name
                },
                {
                    id: 2,
                    lang_id: 2,
                    sort_order: this.optionSort,
                    name: this.selectedValue?.descriptions[1].name
                },
                {
                    id: 3,
                    lang_id: 3,
                    sort_order: this.optionSort,
                    name: this.selectedValue?.descriptions[2].name
                },
                {
                    id: 4,
                    lang_id: 4,
                    sort_order: this.optionSort,
                    name: this.selectedValue?.descriptions[3].name
                }
            ]
        };


        if (this.reviewId) {
            this.optionsService.updateOptionvalue(optionValue, this.reviewId).subscribe(data => {
                this.cleanOtionValue();
                this.getSelectedOptionVal();
                this.selectedValue.descriptions = this.optionValue.descriptions;
            });
        } else {
            this.optionsService.createOptionvalue(optionValue).subscribe(data => {
                this.cleanOtionValue();
                this.getSelectedOptionVal();
            });
        }
    }

    cleanOtionValue(): void {
        this.optionValue.image.src_mini = '';
        this.optionValue.descriptions.forEach(elem => {
            elem.name = '';
        });
        this.reviewId = 0;
        this.optionSort = null;
    }
    deleteOptionValue(): void {

        if (this.reviewId) {
            this.optionsService.deleteOptionValue(this.reviewId).subscribe(data => {
                this.cleanOtionValue();
                this.getSelectedOptionVal();
            });
        }
    }

    selectHandler = (data) => {
        const list: IImage[] = this.image.getSelected();

        if (list[0]) {
            const selectedImage: IImage = list[0];
            this.optionValue.image_id = selectedImage.id;
            this.modalOpen = false;
        }
    };

    onOk() {
        const list: IImage[] = this.image.getSelected();
        this.optionValue.image_id = list[0].id;
        this.selectedValue.image.src_mini = list[0].src_mini;

        this.modalOpen = false;
    }

    onReset() {
        this.optionValue.image_id = null;

    }

    onDeleteImage(prodImage: IProdImage) {
        this.prodImage.deleteProdImage(prodImage);
    }

    onPress() {
        this.modalOpen = true;
    }

}
