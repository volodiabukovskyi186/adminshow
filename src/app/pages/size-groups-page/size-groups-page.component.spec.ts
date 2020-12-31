import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeGroupsPageComponent } from './size-groups-page.component';

describe('SizeGroupsPageComponent', () => {
  let component: SizeGroupsPageComponent;
  let fixture: ComponentFixture<SizeGroupsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeGroupsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeGroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
