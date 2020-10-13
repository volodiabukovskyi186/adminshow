import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageFormComponent } from './settings-page-form.component';

describe('SettingsPageFormComponent', () => {
  let component: SettingsPageFormComponent;
  let fixture: ComponentFixture<SettingsPageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
