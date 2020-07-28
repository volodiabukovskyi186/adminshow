import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumBreadcrumbComponent } from './album-breadcrumb.component';

describe('AlbumBreadcrumbComponent', () => {
  let component: AlbumBreadcrumbComponent;
  let fixture: ComponentFixture<AlbumBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
