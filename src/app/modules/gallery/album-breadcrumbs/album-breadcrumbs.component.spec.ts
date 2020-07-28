import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumBreadcrumbsComponent } from './album-breadcrumbs.component';

describe('AlbumBreadcrumbsComponent', () => {
  let component: AlbumBreadcrumbsComponent;
  let fixture: ComponentFixture<AlbumBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
