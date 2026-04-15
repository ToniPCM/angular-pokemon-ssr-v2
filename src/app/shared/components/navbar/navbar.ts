import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PokemonService } from '../../../pokemons/services/pokemon-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  // pokemonService = inject(PokemonService);
  // pokemonsPage = computed(() => {
  //   return this.pokemonService.currentPage();
  // });
}
