import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonService } from '../../pokemons/services/pokemon-service';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
})
export class PokemonPage implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private title = inject(Title);
  private meta = inject(Meta);
  public pokemonId = this.route.snapshot.paramMap.get('id');

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    // const pokeId = isNaN(+this.pokemonId!) ? null : +this.pokemonId!;

    // if (pokeId) {

    //   this.getPokemon(pokeId);
    // }
    if (this.pokemonId) {
      this.getPokemon(this.pokemonId);
    }
  }

  private getPokemon(id: string) {
    // console.log('id: ', id);
    this.pokemonService
      .getPokemonById(id)
      .pipe(
        tap((pokemon) => this.pokemon.set(pokemon)),
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Página del Pokémon ${name}`;
          const pageImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          this.title.setTitle(pageTitle);
          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ name: 'description', content: `Página del Pokémon ${name}` });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({ name: 'og:description', content: pageDescription });
          this.meta.updateTag({ name: 'og:image', content: pageImage });
        }),
      )
      .subscribe();

    //O BIEN...
    //this.pokemonService.getPokemonById(id).subscribe(this.pokemon.set)
  }

  // logEffect = effect(() => {
  //   console.log('Pokemon: ', this.pokemon());
  // });
}
