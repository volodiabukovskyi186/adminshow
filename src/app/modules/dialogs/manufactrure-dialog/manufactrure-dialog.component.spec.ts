import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactrureDialogComponent } from './manufactrure-dialog.component';

describe('ManufactrureDialogComponent', () => {
  let component: ManufactrureDialogComponent;
  let fixture: ComponentFixture<ManufactrureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactrureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactrureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
