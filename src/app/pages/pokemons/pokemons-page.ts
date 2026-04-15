import { Params } from './../../../../node_modules/@types/express-serve-static-core/index.d';
import { ApplicationRef, Component, inject, OnInit, PendingTasks, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonService } from '../../pokemons/services/pokemon-service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList],
  templateUrl: './pokemons-page.html',
})
export class PokemonsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private pokemonService = inject(PokemonService);
  public pokemonList = signal<SimplePokemon[]>([]);
  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((queryParams) => queryParams.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
    { initialValue: 1 },
  );

  // private readonly pendingTasks = inject(PendingTasks); // Inyecta esto
  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  ngOnInit(): void {
    // const cleanup = this.pendingTasks.add(); // Avisa al servidor que hay una tarea pendiente
    // setTimeout(() => {
    //   this.isLoading.set(false);
    //   // cleanup(); // Avisa que la tarea terminó. Ahora el servidor enviará el HTML.
    // }, 5000);

    // this.route.queryParamMap.subscribe(console.log);
    this.title.setTitle('Pokemons Page');
    // console.log(this.currentPage());

    this.loadPokemons(this.currentPage() ?? 1);
  }

  public loadPokemons(page: number) {
    this.pokemonService
      .loadPage(page)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: page } })),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`)),
      )
      .subscribe((pokemons) => {
        this.pokemonList.set(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
