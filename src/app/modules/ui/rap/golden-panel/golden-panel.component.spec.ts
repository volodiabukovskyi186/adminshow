import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenPanelComponent } from './golden-panel.component';

describe('GoldenPanelComponent', () => {
  let component: GoldenPanelComponent;
  let fixture: ComponentFixture<GoldenPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldenPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
