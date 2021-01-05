import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesFormComponent } from './sizes-form.component';

describe('SizesFormComponent', () => {
  let component: SizesFormComponent;
  let fixture: ComponentFixture<SizesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
