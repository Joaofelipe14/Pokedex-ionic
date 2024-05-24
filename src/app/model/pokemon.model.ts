
export interface PokemonList {
    name: string;
    url: string;
  }
  
  export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: Ability[];
    types: Types[];
    stats: Stats[];
    sprites: Sprites;
    cries:Cries;
  }

  export interface Cries{
    latest: string;
    legacy: string;
  }
  export interface Sprites {
    front_default: string;
    other: {
      front_default: string;
      'official-artwork': {
        front_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  }

  export interface Types{
    type:{
      name:string
    }
  }

  export interface Stats {
    base_stat: number,
    stat:{
      name: string;
    }
  }
  
  export interface Ability {
    ability: {
      name: string;
      url: string;
    }
  }
  