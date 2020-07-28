import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowURapHeroComponent } from './show-u-rap-hero.component';

describe('ShowURapHeroComponent', () => {
  let component: ShowURapHeroComponent;
  let fixture: ComponentFixture<ShowURapHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowURapHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowURapHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
