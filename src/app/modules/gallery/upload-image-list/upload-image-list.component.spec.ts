import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageListComponent } from './upload-image-list.component';

describe('UploadImageListComponent', () => {
  let component: UploadImageListComponent;
  let fixture: ComponentFixture<UploadImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
