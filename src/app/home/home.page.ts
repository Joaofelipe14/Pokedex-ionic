import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  onPokemonSelected(pokemon: string) {
    console.log(pokemon)
  }

  onShowFavorites(){
    console.log('morstar favoritos')
    }

  onTypeSeleceted(type: string){

    console.log(type)
  }



}
