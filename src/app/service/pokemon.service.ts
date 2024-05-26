import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { PokemonDetail, PokemonList } from '../model/pokemon.model';
import { PokemonSpecies } from '../model/pokemonSpecies.model';
import {  PoekmonEvolution } from '../model/pokemonEvolution.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number = 15): Observable<PokemonList[]> {
    return this.http.get<any>(`${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`)
      .pipe(
        map(response => response.results),
        catchError(error => this.handleError(error))
      );
  }

  getPokemonSpecies(name: string): Observable<PokemonSpecies> {
    return this.http.get<any>(`${this.baseUrl}pokemon-species/${name}`)
      .pipe(
        map(response => response),
        catchError(error => this.handleError(error))
      );
  }

  getPokemonsEvolution(url: string): Observable<PoekmonEvolution> {
    return this.http.get<any>(url)
      .pipe(
        map(response => response),
        catchError(error => this.handleError(error))
      );
  }

  getPokemonDetail(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}pokemon/${name}`)
      .pipe(
        map(pokemon => pokemon),
        catchError(error => this.handleError(error))
      );
  }
  
  getPokemonListByType(typeName: string): Observable<PokemonList[]> {
    return this.http.get<any>(`${this.baseUrl}type/${typeName}`)
      .pipe(
        map(response => response.pokemon.map((item: any) => item.pokemon)),
        catchError(error => this.handleError(error))
      );
  }

  getAllPokemonNames(): Observable<PokemonList[]> {
    return this.http.get<any>(`${this.baseUrl}pokemon?limit=9999`)
      .pipe(
        map(response => response.results.map((pokemon: PokemonList) => pokemon)),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ocorreu na solicitação. Por favor, tente novamente mais tarde.');
  }
}