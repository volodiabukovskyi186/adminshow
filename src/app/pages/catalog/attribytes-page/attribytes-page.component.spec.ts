import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttribytesPageComponent } from './attribytes-page.component';

describe('AttribytesPageComponent', () => {
  let component: AttribytesPageComponent;
  let fixture: ComponentFixture<AttribytesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttribytesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttribytesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
