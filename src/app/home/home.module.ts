import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { FilterComponent } from '../component/filter/filter.component';
import { PokemonCardComponent } from '../component/pokemon-card/pokemon-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NavbarComponent, FilterComponent,PokemonCardComponent]
})
export class HomePageModule {}
