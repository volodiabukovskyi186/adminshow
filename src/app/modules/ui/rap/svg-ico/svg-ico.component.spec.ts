import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIcoComponent } from './svg-ico.component';

describe('SvgIcoComponent', () => {
  let component: SvgIcoComponent;
  let fixture: ComponentFixture<SvgIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
