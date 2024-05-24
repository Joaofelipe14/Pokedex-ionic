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
  @Input() pokemonFavoritList: PokemonList[] = [];
  @Output() updateFarovitePokemon = new EventEmitter<string>();

  imageLoaded: boolean = false;

  constructor(private router: Router, private pokemonFavoritesService: PokemonFavoritesService) { }

  ngOnInit() {

  }

  async addFavorite(pokemonName: string) {
    await this.pokemonFavoritesService.addFavorite(pokemonName);
    this.updateFarovitePokemon.emit()
  }

  async removeFavorite(pokemonName: string) {
    await this.pokemonFavoritesService.removeFavorite(pokemonName);
    this.updateFarovitePokemon.emit()

  }

  async toggleFavorite(pokemonName: string) {
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

 
}

