import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { PokemonsService } from '../../pokemons/services/pokemons-service';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPage implements OnInit {
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  public pokemonId = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (!id) return;

    if (!this.pokemonId) return;

    this.pokemonsService
      // .loadPokemon(id)
      .loadPokemon(this.pokemonId)
      .pipe(
        tap((pokemon) => this.pokemon.set(pokemon)),
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Página del Pokémon ${name}`;
          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        }),
      )
      .subscribe();
    // .subscribe(this.pokemon.set);
  }
}
