import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    return [...this.gifsService.tagsHistory];
  }

  searchByClick(tag: string): void {
    return this.gifsService.searchaTag(tag);
  }

}
