import { UserService } from 'src/app/modules/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter,OnDestroy ,OnChanges} from "@angular/core";
import { fade } from "../../animations";
import { trigger, style, transition, animate,state } from "@angular/animations";
import { RapService } from '../../rap.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuService } from 'src/app/core/menu.service';
import { PRIMARY_OUTLET, UrlTree, UrlSegment, UrlSegmentGroup, Router, ActivatedRoute } from '@angular/router';

const TIME = ".3s";
const FN = "ease-in-out";

@Component({
  selector: "rap-nav-group",
  animations: [
    fade,
    trigger("fade2", [
      transition(":enter", [
        style({ opacity: "0", maxHeight: "0" }),
        animate(`${TIME} ${FN}`, style({display:'block', opacity: "1",  maxHeight: "5000px" }))
      ]),
      transition(":leave", [
        style({ opacity: "1", maxHeight: "500px" }),
        animate(`${TIME} ${FN}`, style({display:'none', opacity: "0", maxHeight: "0" }))
      ])
    ]),
    trigger('smallbar', [
      state('small', style({display:'block',  opacity: 1 })),
      state('large', style({display:'none', opacity: 0 })),
      transition('large=>small', animate('100ms ease-in')),
      transition('small=>large', animate('100ms ease-in'))
    ]),
  ],
  templateUrl: "./nav-group.component.html",
  styleUrls: ["./nav-group.component.scss"]
})
export class NavGroupComponent implements OnInit, OnDestroy, OnChanges {
  private openValue: boolean = false;
  public burderStatus: boolean = false;
  public navItemStatus: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  public myAnimatiom = 'small';
  public tree: UrlTree;
  public queryParams = {};
  public primary: UrlSegmentGroup;
  public getUrlSegment;

  @Input() title: string;
  @Input() icon: string;
  @Input() item: any;
  @Input() get open(): boolean {
    return this.openValue;
  }
  @Input() currentItemUrl;

  @Output() openChange = new EventEmitter();
  @Output() userGroup = new EventEmitter();

  set open(val: boolean) {
    this.openValue = val;
    this.openChange.emit(this.openValue);
  }

  constructor(
    public rapService: RapService,
    public menu: MenuService,
    private UserService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.BurgerStatus();

    this.tree = this.router.parseUrl(this.router.url);
    this.queryParams = this.tree?.queryParams;
    this.primary = this.tree?.root?.children[PRIMARY_OUTLET];
    const primarySegments: UrlSegment[] = this.primary?.segments;

    if (primarySegments) {
      this.getUrlSegment = primarySegments[primarySegments?.length - 1];
    }

    this.item?.items?.forEach((val) => {
      //console.log(val);

      if (val.link === this.getUrlSegment?.path) {
        this.open = true;
        val.open = true;
      }
    })

    // this.UserService.SUser.subscribe(user=>{
    //   this.menu.nav=this.menu.nav
    //   let arrUserManage=JSON.parse(JSON.parse((localStorage.getItem('user'))).role.permissions)
    //   console.log('statusMain==>',arrUserManage)
    //   arrUserManage.forEach(elem => {
    //     this.item.mainManage.forEach(item => {
    //       if(item==elem.name){
    //         this.navItemStatus=true;
    //         this.userGroup.emit(this.navItemStatus);
    //       }
    //     });
    //     // if(this.nav.manage==elem.name){
    //     //   this.navItemStatus=true;
    //     // }
    //   });
    // })
  }

  public ngOnChanges(): void {
    // this.UserService.SUser.pipe(takeUntil(this.destroy$)).subscribe(data=>{
      // console.log("itemNAv===>", this.item)
      // let arrUserManage=JSON.parse(JSON.parse((localStorage.getItem('user'))).role.permissions)
      // console.log('statusMain==>',arrUserManage)
      // arrUserManage.forEach(elem => {
      //   this.item.mainManage.forEach(item => {
      //     if(item==elem.name){
      //       this.navItemStatus=true;
            
      //     }
      //   });
        // if(this.nav.manage==elem.name){
        //   this.navItemStatus=true;
        // }
      // });
    // })
  }
  
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  BurgerStatus(): void {
    this.rapService.SBurder.subscribe(data => {
      this.burderStatus = data;
      if (data) {
        this.myAnimatiom = 'large';
      } else {
        this.myAnimatiom = 'small';
      }
    })
  }
  
  public toggle(): void {
    this.open = !this.open;
    this.burderStatus = false;
    this.rapService.SBurder.next(false);
  }
}
