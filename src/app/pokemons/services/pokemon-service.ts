import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { SimplePokemon, PokemonAPIResponse, Pokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);
    return this.http
      .get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));

          return simplePokemons;
        }),
        // tap((pokemons) => console.log({ pokemons })),
      );
  }

  public getPokemonById(id: string): Observable<Pokemon> {
    // if (id < 0) return of();
    if (isNaN(+id)) return of();

    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
