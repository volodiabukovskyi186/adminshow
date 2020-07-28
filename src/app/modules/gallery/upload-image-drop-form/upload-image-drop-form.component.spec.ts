import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageDropFormComponent } from './upload-image-drop-form.component';

describe('UploadImageDropFormComponent', () => {
  let component: UploadImageDropFormComponent;
  let fixture: ComponentFixture<UploadImageDropFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImageDropFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageDropFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
