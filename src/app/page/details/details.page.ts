import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Ability, PokemonDetail, Stats, Types } from 'src/app/model/pokemon.model';
import { PokemonSpecies } from 'src/app/model/pokemonSpecies.model';
import { PokemonService } from 'src/app/service/pokemon.service';

interface Evolution {
  species: {
    name: string;
  };
  evolution_details?: {
    min_level: number;
  }[];
  evolves_to?: Evolution[];
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  pokemonName: string = '';
  pokemon!: PokemonDetail;
  pokemonsEvolution: PokemonDetail[] = []
  maxStatValue: number = 0;
  pokemonSpecie!: PokemonSpecies;
  isloading: boolean = true
  listPokemon: {name:string, lvlmim:string}[] = [];

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


  getPokemonDetail(name: string): void {
    this.pokemonService.getPokemonDetail(name)
      .subscribe(
        (pokemonDetail: PokemonDetail) => {
          this.pokemon = pokemonDetail
          this.calculateMaxStatValue(this.pokemon.stats)

        },
        (error: any) => {
          console.error('Erro ao obter detalhes do Pokémon:', error);
          alert('erro')
        }
      );
  }

  getPokemonSpecies(name: string): void {
    this.pokemonService.getPokemonSpecies(name).subscribe((pokemonSpecie: PokemonSpecies) => {
      this.pokemonSpecie = pokemonSpecie
      this.getEvolutionChan(pokemonSpecie.evolution_chain.url)
    },
      (error: any) => {
        console.error(error);

      })
  }

  getEvolutionChan(url: string): void {
    this.pokemonService.getPokemonsEvolution(url).subscribe((pokemonEvolution: any) => {
      this.extractEvolutions(pokemonEvolution.chain);
      this.loadPokemonDetail(this.listPokemon.map(pokemon => pokemon.name))
      this.isloading = false

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

  extractEvolutions(evolutionChain: any): void {
    if (!evolutionChain || !evolutionChain.species || !evolutionChain.species.name) {
      return;
    }

    const pokemonName = evolutionChain.species.name;
    const minLevel = evolutionChain.evolution_details?.[0]?.min_level ?? null;
    const isPokemonInList = this.listPokemon.some(pokemon => pokemon.name === pokemonName);

    if (!isPokemonInList) {
      this.listPokemon.push({
        name: pokemonName,
        lvlmim : minLevel,
      });
    }
    evolutionChain.evolves_to?.forEach((nextEvolution: any) => {
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

  // Retorna o valor inverso da barra de progresso com base no valor fornecido. Essa inversao é realizada por que a barra de progresso foi invertida  para uma melhor visualizacao.
  calculateProgressBarValue(baseStat: number): string {
    const value = baseStat === 0 ? 0 : 100 - ((baseStat / this.maxStatValue) * 100);
    const formattedValue = value < 10 ? '0' + value.toFixed(2) : value.toFixed(2);
    return formattedValue;
  }

  getAbilities(): Ability[] {
    return this.pokemon.abilities;
  }
  getStats(): Stats[] {
    const statNames: { [key: string]: string } = {
      'hp':'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Special Attack',
      'special-defense': 'Special Defense',
      'speed': 'Speed'
    };
  
    return this.pokemon.stats.map(stat => {
      const name = statNames[stat.stat.name] ;
      return { ...stat, stat: { name } };
    });
  }
  
  

  getTypes(): Types[] {
    return this.pokemon.types
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

    return `${formattedGeneration}`;
  }

  getTextEnglish(TextEntries: any[]): string | null {
    const englishEntry = TextEntries.find(entry => entry.language.name === 'en');

    const controlCharsRegex = /[\f]/g;
    const cleanedText = englishEntry.flavor_text
      .replace(controlCharsRegex, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return cleanedText;
  }

  /*Atribuindo o background para habilidades se baseando pela tipo do pokemo*/
  getColorByType(index: number): string {

    const mainType = this.getTypes()[0].type.name

    if (index % 2 == 0) {
      return `bg-color-${mainType}-light`;
    } else {
      return `bg-color-${mainType}`;
    }

  }

  totalBaseStats: number = 0;

  calculateTotalBaseStats() {
    return this.pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  }
}
