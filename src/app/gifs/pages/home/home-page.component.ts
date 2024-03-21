import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-pages',
  templateUrl: './home-page.component.html',
  // styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private gifService: GifsService) {

  }

  get gifs(): Gif[] {
    // get gifs() {// no es necesario indicar que tipo de dato regresa ya que agarra el tipo de dato que esta regresando el service (gifService)
    return this.gifService.gifList;
  }

}
