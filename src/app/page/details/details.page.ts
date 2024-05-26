import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Ability, PokemonDetail, Stats, Sprites, PokemonSpecies, PokemonEvolution, PokemonList } from 'src/app/model/pokemon.model';
import { PokemonService } from 'src/app/service/pokemon.service';

interface Evolution {
  species: {
    name: string;
    url: string;
  };
  evolves_to: Evolution[];
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  pokemonName: string = '';
  pokemon!: PokemonDetail;
  pokemonsEvolution: PokemonDetail[]=[]
  maxStatValue: number = 0;
  pokemonSpecie!: PokemonSpecies;
  isloading : boolean = true
  listPokemon: PokemonList[] = [];
  evolvedPokemons: string[] = []; 

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonName = params['name'];

      /*Carrega os detalhes do pokemon*/
      this.getPokemonDetail(this.pokemonName)

      /*Faz a requisiao de species e evolution, qnd termina a requisicao isloading vira falso e pagina carrega */
      this.getPokemonSpecies(this.pokemonName)


    });
  }


  getPokemonDetail(name: string):void  {
    this.pokemonService.getPokemonDetail(name)
      .subscribe(
        (pokemonDetail: PokemonDetail) => {
          this.pokemon = pokemonDetail
          // console.log(this.pokemon)
          this.calculateMaxStatValue(this.pokemon.stats)


        },
        (error: any) => {
          console.error('Erro ao obter detalhes do Pokémon:', error);
          alert('erro')
        }
      );
  }


  getPokemonSpecies(name: string):void {
    this.pokemonService.getPokemonSpecies(name).subscribe((pokemonSpecie: PokemonSpecies) => {
      this.pokemonSpecie = pokemonSpecie
      // console.log(pokemonSpecie.evolution_chain.url)
      this.getEvolutionChan(pokemonSpecie.evolution_chain.url)


    },
      (error: any) => {
        console.error(error);

      })
  }


  getEvolutionChan(url: string):void {
    this.pokemonService.getPokemonsEvolution(url).subscribe((pokemonEvolution: PokemonEvolution) => {
      console.log(pokemonEvolution.chain)
      this.extractEvolutions(pokemonEvolution.chain); 
      this.loadPokemonDetail(this.listPokemon.map(pokemon => pokemon.name))
      this.isloading= false


    
    },
      (error: any) => {
        console.error(error);

      })
  }

  loadPokemonDetail(pokemonNames: string[]) {
    const pokemonDetailsRequests = pokemonNames.map(name => this.pokemonService.getPokemonDetail(name));
    forkJoin(pokemonDetailsRequests).subscribe((pokemonDetails: PokemonDetail[]) => {
      this.pokemonsEvolution = pokemonDetails;

    });
  }

  extractEvolutions(evolutionChain: Evolution): void {
    if (!evolutionChain || !evolutionChain.species || !evolutionChain.species.name) {
      return; 
    }
  
    const pokemonName = evolutionChain.species.name;
    const isPokemonInList = this.listPokemon.some(pokemon => pokemon.name === pokemonName);
  
    console.log(isPokemonInList)
    if (!isPokemonInList) {
      this.listPokemon.push({
        name: pokemonName,
        url: evolutionChain.species.url
      });
    }
      evolutionChain.evolves_to?.forEach(nextEvolution => {
      this.extractEvolutions(nextEvolution);
    });
  }
  
  

  calculateMaxStatValue(stats: Stats[]): void {
    if (!stats || stats.length === 0) {
      this.maxStatValue = 0;
      return;
    }
    this.maxStatValue = Math.max(...stats.map(stat => stat.base_stat));
  }

  calculateProgressBarValue(baseStat: number) {
    return baseStat === this.maxStatValue ? 1 : '.' + (baseStat / this.maxStatValue) * 100;
  }

  getAbilities(): Ability[] {
    return this.pokemon ? this.pokemon.abilities : [];
  }

  getStats(): Stats[] {
    return this.pokemon ? this.pokemon.stats : [];
  }

  formatGenerationName(name: string): string {
    const romanNumerals: { [key: string]: string } = {
      'i': '1º',
      'ii': '2º',
      'iii': '3º',
      'iv': '4º',
      'v': '5º',
      'vi': '6º',
      'vii': '7º',
      'viii': '8º',
      'ix': '9º'
    };
    const generationPart = name.split('-')[1];
    const formattedGeneration = romanNumerals[generationPart.toLowerCase()];

    return `${formattedGeneration} GEN`;
  }

   getTextEnglish(TextEntries: any[]): string | null {
    const englishEntry = TextEntries.find(entry => entry.language.name === 'en');
    return englishEntry ? englishEntry.flavor_text : null;
  }

}
