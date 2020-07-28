import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMenuPageComponent } from './site-menu-page.component';

describe('SiteMenuPageComponent', () => {
  let component: SiteMenuPageComponent;
  let fixture: ComponentFixture<SiteMenuPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMenuPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
