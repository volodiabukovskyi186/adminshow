import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesPageComponent } from './sizes-page.component';

describe('SizesPageComponent', () => {
  let component: SizesPageComponent;
  let fixture: ComponentFixture<SizesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
