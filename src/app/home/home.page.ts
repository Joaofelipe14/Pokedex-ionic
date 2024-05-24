import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';
import { PokemonDetail, PokemonList } from '../model/pokemon.model';
import { PokemonService } from '../service/pokemon.service';
import { PokemonFavoritesService } from '../service/pokemon-favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  pokemons: PokemonDetail[] = [];
  listPokemon: PokemonList[] = [];
  pokemonFavoritList: PokemonList[] = [];

  isLoading: boolean = false;
  selectedFilter: string = '';
  offset: number = 0;
  limit: number = 9;

  constructor(private pokemonFavoritesService : PokemonFavoritesService, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
    this.loadListFavorites()
  }

 
  onPokemonSelected(pokemon: string) {
    pokemon ? this.loadPokemonDetail([pokemon]) : this.loadDataPokemonNavigate()

  }

  onShowFavorites(){
    this.showFavoritesPokemons()
  }

  onTypeSeleceted(type: string){
   type !=='all' ?  this.loadPokemonsByType(type) : this.loadPokemons()
  }


  onUpdateFarovitePokemon(){
    this.loadListFavorites()
    if(this.selectedFilter='favorite'){
    }

  }

  /*Funcao para carregar e filtrar lista de pokemons*/

  loadListFavorites() {
    this.pokemonFavoritesService.getFavorites().then((favorites: string[]) => {
      const pokemonFavoritList: PokemonList[] = favorites.map(name => ({
        name: name,
        url: ''
      }));
      this.pokemonFavoritList = pokemonFavoritList
      
    }).catch(error => {
      console.error('Erro ao recuperar a lista de pokémons salvos:', error);
    });
  }

  loadPokemons() {
    this.selectedFilter = '';
    this.isLoading = true;
    this.pokemonService.getPokemonList(this.offset, this.limit)
      .subscribe((PokemonList: PokemonList[]) => {
        this.loadPokemonDetail(PokemonList.map(pokemon => pokemon.name))

      });

  }

  loadPokemonsByType(typeName: string) {
    this.selectedFilter = 'type';
    this.offset = 0
    this.limit = 9
    this.isLoading = true;

    this.pokemonService.getPokemonListByType(typeName)
      .subscribe((listPokemon: PokemonList[]) => {
        /*Importando crie um array para salvar todos o pokemons desse tipo e chamo apenas os 9 primerios inicalmente, para nao fazer a requsicao de todos ao mesmo tempo*/
        this.listPokemon = []
        this.listPokemon = listPokemon;
        this.loadPokemonDetail(this.listPokemon.slice(this.offset, this.limit).map(pokemon => pokemon.name))

      });
  }


  showFavoritesPokemons() {
    this.selectedFilter = 'favorite'
    this.offset = 0
    this.limit = 9
    if (this.pokemonFavoritList.length > 0) {
      this.isLoading = true;
      this.loadPokemonDetail(this.pokemonFavoritList.slice(this.offset, this.limit).map(pokemon => pokemon.name))
    } else {
      console.log('ainda sem pokemon favorito.')
    }

  }

  loadPokemonDetail(pokemonNames: string[]) {
    this.isLoading = true;
    const pokemonDetailsRequests = pokemonNames.map(name => this.pokemonService.getPokemonDetail(name));
    forkJoin(pokemonDetailsRequests).subscribe((pokemonDetails: PokemonDetail[]) => {

      this.pokemons = pokemonDetails;
      this.isLoading = false;
    });
  }



  loadDataPokemonNavigate() {
    switch (this.selectedFilter) {
      case 'type':
        const pokemonNames = this.listPokemon.slice(this.offset, this.offset + this.limit).map(pokemon => pokemon.name);
        this.loadPokemonDetail(pokemonNames);
        break;
      case 'favorite':
        const favoritesNames = this.pokemonFavoritList.slice(this.offset, this.offset + this.limit).map(pokemon => pokemon.name);
        this.loadPokemonDetail(favoritesNames);
        break;
      default:
        this.loadPokemons();
        break;
    }
  }

  hasMorePokemons(): boolean {
    return this.limit > this.pokemons.length;

  }
  
  nextPage() {
    this.offset += this.limit;
    this.loadDataPokemonNavigate()
  }

  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadDataPokemonNavigate()
    }
  }



}
