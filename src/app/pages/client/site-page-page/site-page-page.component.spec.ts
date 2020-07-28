import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePagePageComponent } from './site-page-page.component';

describe('SitePagePageComponent', () => {
  let component: SitePagePageComponent;
  let fixture: ComponentFixture<SitePagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitePagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
