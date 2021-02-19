import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener, ElementRef } from "@angular/core";
import { ICollection } from "../../services/collection.service";
import { ILanguage, LanguageService } from "src/app/modules/localization/language/language.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { ImagesService } from "src/app/modules/gallery/images.service";
import { PromotionService } from '../../../promotion/services/promotion.service';
import { ManufacturerService } from '../../../../../modules/manufacturer/manufacturer.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: "app-collection-form",
  templateUrl: "./collection-form.component.html",
  styleUrls: ["./collection-form.component.scss"],
})
export class CollectionFormComponent implements OnInit, OnDestroy {
  @Input() model: ICollection;
  // @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() host: string = null;
  @Input() public products: any[] ;
  @Output() selectedProducts = new EventEmitter<any>();

  public uploadImgUrl: string;
  public isAngularEditorComp: boolean = true;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'no',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    //uploadUrl: 'v1/image',
    uploadUrl: this.uploadImgUrl,
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      // ['bold', 'italic'],
      // ['fontSize'],
      ['insertImage']
    ]
  };

  public productsListForm: FormGroup;
  public isSelectedProduct: boolean;

  public destroy$: Subject<boolean> = new Subject<boolean>();

  public isActive: boolean = false;
  public isCategoriesActive: boolean = false;
  public displayAllManufactures: any;
  public filteredManufactures = new BehaviorSubject([]);
  public filteredManufactures$ = this.filteredManufactures.asObservable();
  public manufacturerName: any;
  public manufacturerId: number;
  public displayAllCaterories: any;
  public categoryName: any;
  public categoryId: number;
  public filteredCategories = new BehaviorSubject([]);
  public filteredCategories$ = this.filteredCategories.asObservable();
  public displayProducts: any;
  public filteredProducts = new BehaviorSubject([]);
  public filteredProducts$ = this.filteredProducts.asObservable();
  public productName: any;
  public modalOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
    onGlobalClick(event): void {
      if (!this.elementRef.nativeElement.contains(event.target)) {
          //console.log(this.elementRef.nativeElement);
          this.isActive = false;
          this.isCategoriesActive = false;
          this.isSelectedProduct = false;
      }
  }

  constructor(
    public image: ImagesService,
    private promotionService: PromotionService,
    public manufacturerService: ManufacturerService,
    private elementRef: ElementRef,
    public languageService: LanguageService
  ) {}
  
  public ngOnInit(): void {
    this.generateProductsListForm();
    this.image.select.subscribe(this.selectHandler);
    // this.products=[21,20]
  }

  public onPress(): void {
    this.modalOpen = true;
  }

  public onReset(): void {
    this.model.image_id = null;
    this.host = null;
    this.model.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }
  
  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.model.image_id = selectedImage.id;
      this.model.image.src = selectedImage.src;
      this.model.image.src_mini = selectedImage.src_mini;
      this.host = selectedImage.host;
      this.modalOpen = false;
    }
  };

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public generateProductsListForm(): void {
    this.productsListForm = new FormGroup({
      manufactures: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required),
      products: new FormControl('', Validators.required)
    });
    this.productsListForm
    .get('manufactures')
    .valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
        const arr = this.displayAllManufactures.filter(manufacture => manufacture.name.toLowerCase().includes(value.toLowerCase()));
        this.filteredManufactures.next(arr);    
    });

    this.productsListForm
    .get('categories')
    .valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
        const arr = this.displayAllCaterories.filter(category => category.name.toLowerCase().includes(value.toLowerCase()));
        this.filteredCategories.next(arr);    
    });

    this.productsListForm
    .get('products')
    .valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
        const arr = this.displayProducts.filter(product => product.description.name.toLowerCase().includes(value.toLowerCase()));
        this.filteredProducts.next(arr);    
    });
  }

  public getManufactures(): void {
    this.isActive = true;
    this.manufacturerService.getAllManufactures().pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      this.displayAllManufactures = res.data;
      this.filteredManufactures.next(this.displayAllManufactures);
    })
  }

  public getSelectedManufacturer(currentManufacturer): void {
    this.isActive = false;
    this.manufacturerName = currentManufacturer.name;
    this.manufacturerId = currentManufacturer.id;
    this.productsListForm.get('manufactures').patchValue(this.manufacturerName);
  }

  public getCategories() {
    // this.isActive = true;
    this.isCategoriesActive = true;
    this.promotionService.getAllCategories().subscribe((res) => {
      this.displayAllCaterories = this.toArray(res.data, [])
      this.filteredCategories.next(this.displayAllCaterories);
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

  public getSelectedCategory(currentCategory): void {
    // this.isActive = false;
    this.isCategoriesActive = false;
    this.categoryName = currentCategory.name;
    this.categoryId = currentCategory.id;
    this.productsListForm.get('categories').patchValue(this.categoryName);
  }

  public getProducts(): void {
    this.isSelectedProduct = true;

    if (!this.categoryId || !this.manufacturerId) {
      this.promotionService.getAllProducts().subscribe((res) => {
        this.displayProducts = res.data.products;
        this.filteredProducts.next(this.displayProducts);
      })
    }

    const arrCategories = [];
    const arrManufactures = [];

    if (this.categoryId) {
      arrCategories.push(this.categoryId);
    }

    if (this.manufacturerId) {
      arrManufactures.push(this.manufacturerId);
    }

    this.promotionService.getProductByFilters(arrCategories, arrManufactures).subscribe((res) => {
      this.displayProducts = res.data.products;
      this.filteredProducts.next(this.displayProducts);
    })
  }

  public getSelectedProduct(currentProduct) {
    this.isSelectedProduct = false;
    this.productName = currentProduct.description.name;
    this.productsListForm.get('products').patchValue(this.productName);
    let uniqueProducts = new Set(this.products?.map(function(product) {
      return product.id;
    }));

    if (!uniqueProducts.has(currentProduct.id)) {
      this.products?.push(currentProduct);
    }

    this.selectedProducts.emit(this.products);
  }

  public removeProduct(productIndex): void {
    this.products.splice(productIndex, 1);
    this.selectedProducts.emit(this.products);
  }

  public clickOutside(event): void {
    if (event.target) {
      this.isActive = true;
      this.isCategoriesActive = true;
      this.isSelectedProduct = true;
    }
    if (event.target.parentElement) {
      this.isActive = false;
      this.isCategoriesActive = false;
      this.isSelectedProduct = false;
    }
  }

  public getSelectedImg(itemDescription): void {
    const subscription = this.image.getSelectedImg$()
      .subscribe((res) => {
        console.log(res);
        console.log('collection item == >', itemDescription);
        console.log('collection model ==== >>>', this.model);

        if (this.model.id === itemDescription.collection_id) {
          this.model.descriptions.forEach((collectionDesc) => {
            if (collectionDesc.id === itemDescription.id) {
              itemDescription.description += `<img src="https://api.showu.com.ua${res.src}" />`;
              this.modalOpen = false;
            }
          })
        }
      subscription.unsubscribe();
    })
  }
  
  public uploadImgToEditor(itemDesc, event): void {
    event.stopPropagation();
    event.preventDefault();

    this.modalOpen = true;
    this.image.updatedAngularEditorStream$(this.isAngularEditorComp);

    this.getSelectedImg(itemDesc);
  }
}
