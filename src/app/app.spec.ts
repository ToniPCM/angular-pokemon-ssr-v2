import { Component } from '@angular/core';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Navbar } from './shared/components/navbar/navbar';
@Component({
  selector: 'app-navbar',
  template: `
    <nav class="test-class">
      <a href="test-link">Test Link</a>
    </nav>
  `,
})
class MockNavbar {}
describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideBrowserGlobalErrorListeners(), provideRouter([])],
    })
      .overrideComponent(App, {
        add: { imports: [MockNavbar] },
        remove: { imports: [Navbar] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toMatchSnapshot();
  });
});
