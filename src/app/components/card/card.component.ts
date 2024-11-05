import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonData } from '../../models/pokemonData';
import { FormsModule } from '@angular/forms';
import { TransformadorPipe } from '../../pipes/transformador.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ CommonModule, FormsModule, TransformadorPipe ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  pokemon: PokemonData = {
    id: 0,
    name: '',
    sprites: { front_default: ''},
    types: []
  };

  constructor(private pokemonService: PokemonService){

  }

  ngOnInit(): void {
    this.getPokemon('pikachu');
  }

  getPokemon(searchName: string){
    this.pokemonService.getPokemon(searchName).subscribe(
      {
        next: (res) => {
          this.pokemon = {
            id: res.id,
            name: res.name, 
            sprites: res.sprites,
            types: res.types
          }
        },
        error: (err) => console.log(err)
      }
    );
  }
}
