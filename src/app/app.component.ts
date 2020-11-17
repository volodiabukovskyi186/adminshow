import { Component, OnInit,OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit,OnDestroy {
  
  private destroy$: Subject<void> = new Subject<void>();
  public favIcon: HTMLLinkElement;

  constructor(public http: HttpClient) {
    this.favIcon = document.querySelector('#appIcon') || document.querySelector("link[href='favicon.ico']");

    this.getAllSiteData();
  }
  ngOnInit(){
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public getAllSiteData(): void {
    //const host = 'https://api.showu.com.ua';
    
    this.getSiteData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      if (this.favIcon) {
        this.favIcon.href = 'https://api.showu.com.ua' + res.data.icon.src;
      }
    })
  }
  public getSiteData(): Observable<any> {
    return this.http.get<any>(`${environment.host}site/1`);
  }
}
