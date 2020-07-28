import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttribyteGroupPageComponent } from './attribyte-group-page.component';

describe('AttribyteGroupPageComponent', () => {
  let component: AttribyteGroupPageComponent;
  let fixture: ComponentFixture<AttribyteGroupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttribyteGroupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttribyteGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
