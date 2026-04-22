import { Location } from '@angular/common';
import { inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import AboutPage from './pages/about/about-page';
import PokemonsPage from './pages/pokemons/pokemons-page';
import PricingPage from './pages/pricing/pricing-page';
describe('App Routes', () => {
  let router: Router;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
    }).compileComponents();
    // En Angular 21 + Vitest, esto evita NG0203 al resolver tokens del Router
    TestBed.runInInjectionContext(() => {
      router = inject(Router);
      location = inject(Location);
    });
    router.initialNavigation();
    await Promise.resolve();
  });
  it('should be defined', () => {
    expect(routes).toBeDefined();
  });
  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });
  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();
    const component = (await aboutRoute.loadComponent!()) as any;
    expect(component.default).toBe(AboutPage);
  });
  it('should navigate to "/about" when default path is set', async () => {
    await router.navigate(['/']);
    await Promise.resolve();
    expect(location.path()).toBe('/about');
  });
  it('should render PricingPageComponent when path is /pricing', async () => {
    const route = routes.find((route) => route.path === 'pricing')!;
    expect(route).toBeDefined();
    const component = (await route.loadComponent!()) as any;
    expect(component.default).toBe(PricingPage);
  });
  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons/page/1']);
    await Promise.resolve();
    expect(location.path()).toBe('/pokemons/page/1');
  });
  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    const route = routes.find((route) => route.path === 'pokemons/page/:page')!;
    expect(route).toBeDefined();
    const component = (await route.loadComponent!()) as any;
    expect(component.default).toBe(PokemonsPage);
  });
  it('should redirect to /about when path is unknown', async () => {
    await router.navigate(['/123asdjkhasd']);
    await Promise.resolve();
    expect(location.path()).toBe('/about');
  });
});
