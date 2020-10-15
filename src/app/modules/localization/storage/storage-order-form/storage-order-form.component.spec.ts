import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOrderFormComponent } from './storage-order-form.component';

describe('StorageOrderFormComponent', () => {
  let component: StorageOrderFormComponent;
  let fixture: ComponentFixture<StorageOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
