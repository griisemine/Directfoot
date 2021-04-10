import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  ROOT_URL: string = "https://v3.football.api-sports.io";
  API_KEY: string = "b21eb12292b3695485d39ea23412ffab";

  // List des differents matchs
  // Node/Express API
  constructor( private httpClient: HttpClient ) {
    console.log("Je suis dans le constructeur de service");
   }


  sendRequest(params:string){
    const headers = new HttpHeaders().set('x-rapidapi-host', 'v3.football.api-sports.io').set('x-rapidapi-key', this.API_KEY );
    return this.httpClient.get(this.ROOT_URL + params ,{ headers , responseType: 'text' } );
  }
}
