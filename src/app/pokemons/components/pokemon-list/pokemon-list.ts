import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SimplePokemon } from '../../interfaces';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonList {
  public pokemons = input.required<SimplePokemon[]>();
}
