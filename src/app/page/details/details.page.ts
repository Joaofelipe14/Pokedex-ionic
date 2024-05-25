import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability, PokemonDetail, Stats, Sprites, PokemonSpecies, PokemonEvolution } from 'src/app/model/pokemon.model';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  pokemonName: string = '';
  pokemon!: PokemonDetail;
  maxStatValue: number = 0;
  PokemonSpecie!: PokemonSpecies;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonName = params['name'];
      this.getPokemonDetail(this.pokemonName)



    });
  }


  getPokemonDetail(name: string) {
    this.pokemonService.getPokemonDetail(name)
      .subscribe(
        (pokemonDetail: PokemonDetail) => {
          this.pokemon = pokemonDetail
          console.log(this.pokemon)

          this.calculateMaxStatValue(this.pokemon.stats)


          this.getPokemonSpecies(this.pokemonName)

        },
        (error: any) => {
          console.error('Erro ao obter detalhes do Pokémon:', error);
        }
      );
  }


  getPokemonSpecies(name: string) {
    this.pokemonService.getPokemonSpecies(name).subscribe((pokemonSpecie: PokemonSpecies) => {
      this.PokemonSpecie = pokemonSpecie
      console.log(pokemonSpecie.evolution_chain.url)
      this.getEvolutionChan(pokemonSpecie.evolution_chain.url)


    },
      (error: any) => {
        console.error(error);

      })
  }


  getEvolutionChan(url: string){
    this.pokemonService.getPokemonsEvolution(url).subscribe((pokemonEvolution: PokemonEvolution) => {
      console.log(pokemonEvolution.chain)

    },
      (error: any) => {
        console.error(error);

      })
  }

  calculateProgressBarValue(baseStat: number) {
    return baseStat === this.maxStatValue ? 1 : '.' + (baseStat / this.maxStatValue) * 100;
  }

  calculateMaxStatValue(stats: Stats[]): void {
    if (!stats || stats.length === 0) {
      this.maxStatValue = 0;
      return;
    }
    this.maxStatValue = Math.max(...stats.map(stat => stat.base_stat));
  }

  getAbilities(): Ability[] {
    return this.pokemon ? this.pokemon.abilities : [];
  }

  getStats(): Stats[] {
    return this.pokemon ? this.pokemon.stats : [];
  }

}
