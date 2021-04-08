import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  ROOT_API: string = "http://127.0.0.1:8080";
  API_KEY: string = "b21eb12292b3695485d39ea23412ffab";
  HEADERS = new HttpHeaders().set('x-rapidapi-host', 'v3.football.api-sports.io').set('x-rapidapi-key', this.API_KEY);

  // Node/Express API
  constructor( private httpClient: HttpClient ) { }

  GetUniqueMatch(matchID:string){
    console.log( this.httpClient.get( this.ROOT_API + '/Match?id=' + matchID ) )
    return this.httpClient.get( this.ROOT_API + '/Match?id=' + matchID);
  }

}
