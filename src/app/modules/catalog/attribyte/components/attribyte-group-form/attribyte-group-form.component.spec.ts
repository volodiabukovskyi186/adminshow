import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttribyteGroupFormComponent } from './attribyte-group-form.component';

describe('AttribyteGroupFormComponent', () => {
  let component: AttribyteGroupFormComponent;
  let fixture: ComponentFixture<AttribyteGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttribyteGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttribyteGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
