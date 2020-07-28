import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttibuteValueComponent } from './attibute-value.component';

describe('AttibuteValueComponent', () => {
  let component: AttibuteValueComponent;
  let fixture: ComponentFixture<AttibuteValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttibuteValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttibuteValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
