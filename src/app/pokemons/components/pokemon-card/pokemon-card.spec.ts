import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { ActivatedRoute, provideRouter, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'Bulbasaur',
};

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [PokemonCard],
    });
    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;

    //Valores de los inputs
    fixture.componentRef.setInput('pokemon', { ...mockPokemon });

    fixture.detectChanges(); //IMportante
  });

  it('should create', () => {
    // console.log(fixture.nativeElement.innerHTML);
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon);
  });

  it('should compute the correct pokemon image URL', () => {
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(component.pokemonImage()).toBe(expectedUrl);
  });

  it('should render pokemon and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const nameElement = compiled.querySelector('h2');
    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);

    const imgElement = compiled.querySelector('img');
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(imgElement?.src).toBe(expectedUrl);
    expect(imgElement?.alt).toBe(mockPokemon.name);
    // expect(compiled.querySelector('img')).toBeTruthy();
    // console.log(compiled.querySelector('img')!.src);
    // expect(compiled.querySelector('img')!.src).toBe(expectedUrl);
  });

  //*IMPORTANTE: FORMA DE TESTEAR DIRECTIVAS
  it('should have the correct routeLink confguration', () => {
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink);

    const expectedUrl = `/pokemons/${mockPokemon.name}`;
    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl);
    console.log(routerLinkInstance.urlTree?.toString());
  });
});
