import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page').then((c) => c.PokemonsPage),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page').then((c) => c.PokemonPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page').then((c) => c.AboutPage),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page').then((c) => c.PricingPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page').then((c) => c.ContactPage),
  },
  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService)
      return 'about';
    },
  },
];
