import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonList } from './pokemon-list';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PokemonCard } from '../pokemon-card/pokemon-card';

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
  { id: '3', name: 'venusaur' },
  { id: '4', name: 'charmander' },
  { id: '5', name: 'charmeleon' },
];

describe('PokemonList', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;

    //Valores de los inputs
    fixture.componentRef.setInput('pokemons', [...mockPokemons]);

    fixture.detectChanges(); //IMportante
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the pokemonslist', () => {
    const pokeCards = fixture.debugElement.queryAll(By.directive(PokemonCard));
    // const pokeCardsInstances = pokeCards.map((pokeCard) => pokeCard.injector.get(PokemonCard));
    const pokeCardsInstances = pokeCards.map((pokeCard) => pokeCard.componentInstance);
    // console.log(pokeCardsInstances);
    pokeCardsInstances.forEach((pokeCard) => console.log(pokeCard));
    expect(pokeCardsInstances.length).toBe(mockPokemons.length);

    // const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.innerHTML)
  });
});
