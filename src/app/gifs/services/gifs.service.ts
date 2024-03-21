import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'qVoN6iO7L2WibHPus3ihxe2lySWnCjsF';
  private serviceUrl = 'http://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs srvices');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    // tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);//cortar

    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));

  }

  private loadLocalStorage(): void {

    //verificar si existe objeto en local storage
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); // usar operador not null operator, para decirle que puede venir nulo

    if(this._tagsHistory.length === 0) return;

    //buscar gifs del ultimo elemento guardado en _tagsHistory
    this.searchaTag(this._tagsHistory[0]);
    // console.log(this._tagsHistory[0]);

  }

  // async searchaTag(tag: string): Promise<void> {//con fetch
  searchaTag(tag: string): void {
    // if(this._tagsHistory.length === 0) return; // validar el tamaño del arreglo

    if (tag == '') return; // validacion con parametro tag a recibir este vacio
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        console.log(resp);

        this.gifList = resp.data;
        // console.log({ gifs: this.gifList });

      });

    //mandar llamar un api manualmente con un endpoint
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=qVoN6iO7L2WibHPus3ihxe2lySWnCjsF&q=cats&limit=10')
    //   .then(resp => resp.json())
    //   .then(data => console.log(data)
    //   );

    // validar que si el arreglo ya llego a tamaño de 10 borre el primer elemento que fue agregado que en su caso queda en la ultima posicion
    // if (this._tagsHistory.length == 10) {
    //   this._tagsHistory.splice(this._tagsHistory.length - 1)
    // }
    // this._tagsHistory.unshift(tag);

    // console.log(this.tagsHistory);

  }
}
