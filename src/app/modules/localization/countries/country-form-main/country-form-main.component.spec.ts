import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFormMainComponent } from './country-form-main.component';

describe('CountryFormMainComponent', () => {
  let component: CountryFormMainComponent;
  let fixture: ComponentFixture<CountryFormMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryFormMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFormMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
