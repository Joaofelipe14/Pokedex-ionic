import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonDetail, PokemonList } from 'src/app/model/pokemon.model';
import { PokemonService } from 'src/app/service/pokemon.service';


const POKEMON_TYPES = [
  { name: 'normal' },
  { name: 'fire' },
  { name: 'water' },
  { name: 'electric' },
  { name: 'grass' },
  { name: 'ice' },
  { name: 'fighting' },
  { name: 'poison' },
  { name: 'ground' },
  { name: 'flying' },
  { name: 'psychic' },
  { name: 'bug' },
  { name: 'rock' },
  { name: 'ghost' },
  { name: 'dragon' },
  { name: 'dark' },
  { name: 'steel' },
  { name: 'fairy' }
]
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  /*variaveis para se comunicar com componente filho */
  @Output() pokemonSelected = new EventEmitter<any>();
  @Output() typeSelected = new EventEmitter<any>()
  @Output() FavoritesSelected = new EventEmitter<void>();

  valueToPass: string = 'Este é o valor do pai';

  pokemons: PokemonDetail[] = [];
  listAllPokemons: PokemonList[] = [];
  listAutoCompletePokemons: PokemonList[] = [];

  types = POKEMON_TYPES;

  showAutocomplete: boolean = false;
  selectedPokemon: string = ''; 

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadAllPokemonNames();
  }


  showFavorites() {
    this.FavoritesSelected.emit();
  }

  loadAllPokemonNames() {
    this.pokemonService.getAllPokemonNames().subscribe(
      (names: PokemonList[]) => {
        this.listAllPokemons = names;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onSearchChange(event: any) {
    this.showAutocomplete = true;
    const searchTerm = event.target.value?.toLowerCase().trim() ?? '';
    if (searchTerm.trim() === '') {
      this.showAutocomplete = false;
      return;
    }

    this.listAutoCompletePokemons = this.listAllPokemons.filter(pokemon =>
      pokemon.name.includes(searchTerm)
    );

  }

  onClearSearch() {
    this.showAutocomplete = false;
    this.listAutoCompletePokemons = [];
    this.pokemonSelected.emit('');
    this.selectedPokemon = ''; 

  }

  selectPokemon(pokemon: PokemonList) {
    this.showAutocomplete = false;
    this.selectedPokemon = pokemon.name;
    this.pokemonSelected.emit( this.selectedPokemon );

  }

  showType(type: string) {
    this.typeSelected.emit(type)
  }

}

