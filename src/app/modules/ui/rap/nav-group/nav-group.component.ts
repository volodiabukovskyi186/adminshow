import { UserService } from 'src/app/modules/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter,OnDestroy ,OnChanges} from "@angular/core";
import { fade } from "../../animations";
import { trigger, style, transition, animate,state } from "@angular/animations";
import { RapService } from '../../rap.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuService } from 'src/app/core/menu.service';

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
export class NavGroupComponent implements OnInit ,OnDestroy,OnChanges{
  private openValue: boolean = false;
  public burderStatus:boolean=false;
  public navItemStatus:boolean=false;
  private destroy$: Subject<void> = new Subject<void>();
  myAnimatiom='small';
  @Input() title: string;
  @Input() icon: string;

  @Input() item: any;

  @Input() get open(): boolean {
    return this.openValue;
  }

  @Output() openChange = new EventEmitter();
  @Output() userGroup = new EventEmitter();

  set open(val: boolean) {
    this.openValue = val;
    this.openChange.emit(this.openValue);
  }

  constructor(public rapService:RapService,
    private UserService:UserService,
    public menu: MenuService,) {}

  ngOnInit(): void {
    this.BurgerStatus()
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
  ngOnChanges():void{
    // this.UserService.SUser.pipe(takeUntil(this.destroy$)).subscribe(data=>{
      // debugger;s
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
  
  BurgerStatus():void{
    this.rapService.SBurder.subscribe(data=>{
      this.burderStatus=data;
      if(data){
        console.log('item===>', this.myAnimatiom)
        this.myAnimatiom='large'

      }
      else{
        this.myAnimatiom='small'
        console.log('item===>false', this.myAnimatiom)
      }
      
      // console.log('statusBurger==>',data)
    })
  }
  

  toggle() {
    this.open = !this.open;
    this.burderStatus=false
    this.rapService.SBurder.next(false)
  }
}
