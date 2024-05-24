import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface PokemonDB extends DBSchema {
  favorites: {
    key: string;
    value: { name: string };
  };
}

@Injectable({
  providedIn: 'root'
})
export class PokemonFavoritesService {
  private dbPromise: Promise<IDBPDatabase<PokemonDB>>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  /**
   * Inicializa o banco de dados IndexedDB
   * @returns {Promise<IDBPDatabase<PokemonDB>>} - Banco de dados inicializado
   */
  private async initDB(): Promise<IDBPDatabase<PokemonDB>> {
    return openDB<PokemonDB>('pokemon-db', 1, {
      upgrade(db) {
        db.createObjectStore('favorites', { keyPath: 'name' });
      }
    });
  }

  /**
   * Recupera a lista de pokémons favoritados do IndexedDB
   * @returns {Promise<string[]>} - Lista de nomes de pokémons favoritados
   */
  async getFavorites(): Promise<string[]> {
    const db = await this.dbPromise;
    const allFavorites = await db.getAll('favorites');
    return allFavorites.map(fav => fav.name);
  }

  /**
   * Adiciona um pokémon à lista de favoritos
   * @param {string} name - Nome do pokémon a ser favoritado
   */
  async addFavorite(name: string): Promise<void> {
    const db = await this.dbPromise;
    await db.add('favorites', { name });
  }

  /**
   * Remove um pokémon da lista de favoritos
   * @param {string} name - Nome do pokémon a ser removido
   */
  async removeFavorite(name: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('favorites', name);
  }

  /**
   * Verifica se um pokémon está na lista de favoritos
   * @param {string} name - Nome do pokémon a ser verificado
   * @returns {Promise<boolean>} - Verdadeiro se o pokémon estiver favoritado, falso caso contrário
   */
  async isFavorite(name: string): Promise<boolean> {
    const db = await this.dbPromise;
    const favorite = await db.get('favorites', name);
    return !!favorite;
  }
}
