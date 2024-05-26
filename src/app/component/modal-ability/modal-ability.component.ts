import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PokemonService } from 'src/app/service/pokemon.service';


@Component({
  selector: 'app-modal-ability',
  templateUrl: './modal-ability.component.html',
  styleUrls: ['./modal-ability.component.scss'],
})
export class ModalAbilityComponent  implements  OnInit {

  @Input() ability: { abilityName: string, type: string } = { abilityName: '', type: '' };

  abilityData: any;
  constructor(private modalController: ModalController, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.fetchAbilityData(this.ability.abilityName);

  }

  fetchAbilityData(ability: string): void {
    this.pokemonService.getAability(ability).subscribe((pokemonAbility: any) => {
      const effectEntry = pokemonAbility.effect_entries.find((entry: { language: { name: string; }; }) => entry.language.name === 'en');
      this.abilityData = {
        short_effect: effectEntry.short_effect,
        effect: effectEntry.effect
      };

    },
      (error: any) => {
        console.error(error);

      })
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
