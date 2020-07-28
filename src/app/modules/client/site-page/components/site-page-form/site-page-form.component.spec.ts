import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePageFormComponent } from './site-page-form.component';

describe('SitePageFormComponent', () => {
  let component: SitePageFormComponent;
  let fixture: ComponentFixture<SitePageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitePageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
