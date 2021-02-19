import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IProdAttr } from '../../../services/product-attributes.service';
import { ILanguage } from 'src/app/modules/localization/language/language.service';
import { IAttribyte } from 'src/app/modules/catalog/attribyte/interfaces';
import { AttribyteService } from "src/app/modules/catalog/attribyte/services/attribyte.service";
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'product-form-attibute-value',
  templateUrl: './attibute-value.component.html',
  styleUrls: ['./attibute-value.component.scss']
})
export class AttibuteValueComponent implements OnInit, OnDestroy {
  @Input() langs: ILanguage[];
  @Input() model: IProdAttr;
  //@Input() attributes;

  public attributesData: any;

  public filteredAttributes = new BehaviorSubject([]);
  public filteredAttributes$ = this.filteredAttributes.asObservable();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public attr: AttribyteService
  ) { }

  public ngOnInit(): void {
    this.getClientAttributes();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getClientAttributes(): void {
    this.attr.getClientAttributes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((attributes) => {
        //this.attributesData = attributes.data;
        this.filteredAttributes.next(attributes.data);
    })
  }
}
