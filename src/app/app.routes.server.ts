import { RenderMode, ServerRoute } from '@angular/ssr';
const POKEMON_LIMIT = 151;
async function fetchPokemonNames(limit: number): Promise<string[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results.map((pokemon: { name: string }) => pokemon.name);
}

export const serverRoutes: ServerRoute[] = [
  // {
  //   // path: 'pokemons/page/:page',
  //   path: 'pokemons/page/:page',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     return Array.from({ length: POKEMON_LIMIT }, (_, i) => ({ page: (i + 1).toString() }));
  //   },
  // },
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const names = await fetchPokemonNames(POKEMON_LIMIT);
      return names.map((name) => ({ id: name }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // El resto se puede pre-renderizar
  },
];
