import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gif.Interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http:HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('gif')!) || [];
  }

  private apiKey:string = 'Nk51FIXpUhvF14OZV5xLb9uqpx9LGcbr';
  private _historial:string[]=[];
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';

  //Change any by his type
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( ( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;
        localStorage.setItem('gif', JSON.stringify(this.resultados));
      });
  }
}
