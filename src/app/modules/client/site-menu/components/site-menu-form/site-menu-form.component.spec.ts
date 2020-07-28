import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMenuFormComponent } from './site-menu-form.component';

describe('SiteMenuFormComponent', () => {
  let component: SiteMenuFormComponent;
  let fixture: ComponentFixture<SiteMenuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMenuFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
