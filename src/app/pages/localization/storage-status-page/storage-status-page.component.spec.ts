import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageStatusPageComponent } from './storage-status-page.component';

describe('StorageStatusPageComponent', () => {
  let component: StorageStatusPageComponent;
  let fixture: ComponentFixture<StorageStatusPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageStatusPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
