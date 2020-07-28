import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have a app-pages component", () => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(
      AppComponent
    );

    const appComponent: HTMLElement = fixture.nativeElement;
    const appPages = appComponent.querySelector("app-pages");
    expect(appPages).toBeTruthy();
  });
});
