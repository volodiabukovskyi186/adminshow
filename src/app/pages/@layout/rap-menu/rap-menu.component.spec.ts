import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapMenuComponent } from './rap-menu.component';

describe('RapMenuComponent', () => {
  let component: RapMenuComponent;
  let fixture: ComponentFixture<RapMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
