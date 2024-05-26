// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { FilterComponent } from '../component/filter/filter.component';
import { PokemonCardComponent } from '../component/pokemon-card/pokemon-card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalAbilityComponent } from '../component/modal-ability/modal-ability.component';

@NgModule({
  declarations: [NavbarComponent, FilterComponent, PokemonCardComponent,ModalAbilityComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [NavbarComponent, FilterComponent, PokemonCardComponent,ModalAbilityComponent] // Exportar NavbarComponent e FilterComponent
})
export class SharedModule { }
