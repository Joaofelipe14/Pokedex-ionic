import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonList } from '../../model/pokemon.model';
import { PokemonFavoritesService } from 'src/app/service/pokemon-favorites.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {


  @Input() pokemon: any;
  pokemonFavoritList: PokemonList[] = [];
  imageLoaded: boolean = false;

  constructor(private router: Router, private pokemonFavoritesService: PokemonFavoritesService) { }

  ngOnInit() {
    this.loadListFavorites()

  }

  async addFavorite(pokemonName: string) {
    await this.pokemonFavoritesService.addFavorite(pokemonName);
    this.loadListFavorites()
  }

  async removeFavorite(pokemonName: string) {
    await this.pokemonFavoritesService.removeFavorite(pokemonName);
    this.loadListFavorites()

  }

  async toggleFavorite(pokemonName: string) {
    console.log(pokemonName)
    console.log()
    if (await this.isFavorite(pokemonName)) {
      await this.removeFavorite(pokemonName);
    } else {
      await this.addFavorite(pokemonName);
    }
  }

  isFavorite(pokemonName: string): boolean {
    return this.pokemonFavoritList.some(pokemon => pokemon.name == pokemonName);
  }

  goToDetails(pokemonName: string) {
    this.router.navigate(['/details', pokemonName]);
  }

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


 
}

