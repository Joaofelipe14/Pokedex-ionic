
export interface PoekmonEvolution {
  chain: {
    species: {
      name: string;
    };
    evolution_details?: {
      min_level: number | undefined;
    }[];
    evolves_to?: PoekmonEvolution[];
  };
}

export interface NextEvolution {
  species: {
    name: string;
  };
  evolution_details?: {
    min_level: number | undefined;
  }[];
  evolves_to?: PoekmonEvolution[];
}