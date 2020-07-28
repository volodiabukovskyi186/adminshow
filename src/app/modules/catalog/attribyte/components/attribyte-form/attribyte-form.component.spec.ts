import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttribyteFormComponent } from './attribyte-form.component';

describe('AttribyteFormComponent', () => {
  let component: AttribyteFormComponent;
  let fixture: ComponentFixture<AttribyteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttribyteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttribyteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
