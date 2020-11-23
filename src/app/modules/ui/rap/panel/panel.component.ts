import { CurrenciesService } from './../../../../pages/localization/currencies-page/services/currencies-page.service';
import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from "@angular/core";
import { slideRight, scale } from "../../animations";
import { LanguageService } from 'src/app/core/language.service';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { Router } from "@angular/router";
import { UserService } from 'src/app/modules/user/user.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { NavLink } from '../nav-item/nav-link';
import { RapService } from '../../rap.service';
import { smallBar, fade} from "../../animations";
import { trigger, style, transition, animate,state } from "@angular/animations";
export interface IPanelLabesl {
  filter: string;
  add: string;
  cancel: string;
  save: string;
  review: string;
  download:string;

}
const TIME = ".3s";
const FN = "ease-in-out";
@Component({
  selector: "rap-panel",
  animations: [slideRight, scale, smallBar,
    trigger("smallBar1", [
      transition(":enter", [
        style({ opacity: "0", width: "80px" }),
        animate(`${TIME} ${FN}`, style({ opacity: "1", background:'red' }))
      ]),
      transition(":leave", [
        style({ opacity: "1", width: "280px" }),
        animate(`${TIME} ${FN}`, style({ opacity: "1", background:'yellow' }))
      ])
    ]),

    trigger('smallbar', [
      state('small', style({ width: '80px', opacity: 1 })),
      state('large', style({ width: '250px', opacity: 1 })),
      transition('large=>small', animate('400ms ease-in')),
      transition('small=>large', animate('400ms ease-in'))
    ]),
    ], 
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
})
export class PanelComponent implements OnInit ,OnChanges{
  
  @Input() labels: IPanelLabesl = {
    filter: "Filter",
    add: "Add",
    cancel: "Calcel",
    save: "Save",
    review: "Review",
    download: "Download"

  };

  private showRightSideValue: boolean = false;
  @Input() showRightToggleBtn: boolean = true;

  @Input() showLeftSide: boolean = true;
  // @Input() showRightSide: boolean = false;
  @Input() showFooter: boolean = true;
  @Input() showTop: boolean = true;

  @Input() get showRightSide(): boolean {
    return this.showRightSideValue;
  }
  @Output() showRightSideChange = new EventEmitter();
  set showRightSide(val: boolean) {
    this.showRightSideValue = val;
    this.showRightSideChange.emit(this.showRightSideValue);
  }

  //#region Is Show Form

  private _showForm: boolean;
  @Output() showFormChange = new EventEmitter();

  set showForm(val: boolean) {
    this._showForm = val;
    this.showFormChange.emit(this._showForm);
  }

  @Input() get showForm(): boolean {
    return this._showForm;
  }

  //#endregion

  // is show cancel btn

  private _isCancelBtn: boolean = false;
  @Output() isCancelBtnChange = new EventEmitter();

  set isCancelBtn(val: boolean) {
    this._isCancelBtn = val;
    this.isCancelBtnChange.emit(this._isCancelBtn);
  }

  @Input() get isCancelBtn(): boolean {
    return this._isCancelBtn;
  }

  @Output() cancelClick = new EventEmitter();

  onCancelClick = () => this.cancelClick.emit();

  // is show save btn

  private _isSaveBtn: boolean = true;
  @Output() isSaveBtnChange = new EventEmitter();

  set isSaveBtn(val: boolean) {
    this._isSaveBtn = val;
    this.isSaveBtnChange.emit(this._isSaveBtn);
  }

  @Input() get isSaveBtn(): boolean {
    //console.log(this._isSaveBtn);
    return this._isSaveBtn;
  }

  @Output() saveClick = new EventEmitter();

  onSaveClick = () => this.saveClick.emit();

  // is show plus button

  private _isPlusBtn: boolean = true;
  @Output() isPlusBtnChange = new EventEmitter();

  set isPlusBtn(val: boolean) {
    this._isPlusBtn = val;
    this.isPlusBtnChange.emit(this._isPlusBtn);
  }

  @Input() get isPlusBtn(): boolean {
    return this._isPlusBtn;
  }

  @Output() plusClick = new EventEmitter();

  onPlusClick = () => this.plusClick.emit();

  //Download=>
  private _isDwnloadBtn: boolean = false;
  @Output() isDwnloadClick = new EventEmitter();

  set isDwnloadBtn(val: boolean) {
    this._isDwnloadBtn = val;
    this.isDwnloadClick.emit(this._isDwnloadBtn);
  }

  @Input() get isDwnloadBtn(): boolean {
    return this._isDwnloadBtn;
  }

  @Output() DownloadClick = new EventEmitter();
  onDwnloadClick = () => {
    this.DownloadClick.emit();
  }

  private _isReviewBtn: boolean = false;
  @Output() isReviewBtnChange = new EventEmitter();

  set isReviewBtn(val: boolean) {
    this._isReviewBtn = val;
    this.isReviewBtnChange.emit(this._isReviewBtn);
  }

  @Input() get isReviewBtn(): boolean {
    return this._isReviewBtn;
  }

  @Output() reviewClick = new EventEmitter();
  onReviewClick = () => this.reviewClick.emit();
  private _toggleFilter: boolean = false;
  @Output() toggleFilterChange = new EventEmitter();

  set toggleFilter(val: boolean) {
    this._toggleFilter = val;
    this.toggleFilterChange.emit(this._toggleFilter);
  }

  @Input() get toggleFilter(): boolean {
    return this._toggleFilter;
  }

  @Output() filterClick = new EventEmitter();

  onFilterClick = () => this.filterClick.emit();
  arrCurrency:any;
  currentLang:any;
  langStatus: boolean = false;
  langItem:any;
  statusItem=false

  open: boolean = false;
  nav: NavLink = {
    link: '',
    title: "logout",
  }

    flagicon;
    burderStatus=false;
    myAnimatiom: string = 'large';
  constructor(private currencyService:CurrenciesService,
    public lang: LanguageService,
    public languageService: LocalizationLang,
    private router: Router,
    public user: UserService,
    private auth: AuthService,
    public rapService:RapService) {
  
    }

  ngOnInit(): void {
   
    this.getCurrency()
    this.currentLang=localStorage.getItem('currentLang')
    this.user.getByToken().subscribe(this.getByTokenHandler);
    this.lang.langs.forEach(elem=>{
      if(elem.locale==this.currentLang){
        this.flagicon=elem.src
      }
    })
  
  
  }
  ngOnChanges():void{
  this.rapService.SBurder.subscribe(data=>{
    this.burderStatus=data;
      this.burderStatus==false?this.myAnimatiom="large":this.myAnimatiom="small"
      console.log('panell===>',this.myAnimatiom)
  })

  }

  toggleRight = () => (this.showRightSide = !this.showRightSide);

  public showModalForm = () => (this.showForm = true);
  public hideModalForm = () => (this.showForm = false);

  getCurrency():void{
    this.currencyService.getCurrencies().subscribe(data=>{
        this.arrCurrency=data;
      
    })
  }
  getRoute(locale: string) {
    let route = this.router.url.split("/");
    let res = ["/", locale];
    route.forEach((item) => {
      if (item != "" && !item.match(/en|pl|ru|ua/)) {
        res.push(item);
      }
    });
    this.currentLang=localStorage.getItem('currentLang')

    this.lang.langs.forEach(elem=>{
      if(elem.locale==this.currentLang){
        this.flagicon=elem.src
      }
    })
    return res;
  }
  
  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(["login"]);
  }

  getByTokenHandler = (data) => {
    this.user.saveUser(data.data);
  };
  sideBar():void{
    this.burderStatus=!this.burderStatus;
    this.rapService.SBurder.next(this.burderStatus)
    // console.log('status===>rrrr', this.burderStatus)
    this.burderStatus==false?this.myAnimatiom="large":this.myAnimatiom="small"
  }

  
}
