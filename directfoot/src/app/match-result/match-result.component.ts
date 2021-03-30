import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.css']
})



export class MatchResultComponent implements OnInit {

  readonly ROOT_URL = "https://v3.football.api-sports.io"
  
  
  JSONparse = ""

  getPosts (){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');

    this.http.get(this.ROOT_URL + '/fixtures?last=1' ,{ headers , responseType: 'text' } )
            .subscribe( data => this.JSONparse = JSON.parse(data) );
    
  }

  constructor(private http: HttpClient) { }
  

  localLogo = "https://media.api-sports.io/football/teams/9245.png";
  localTeam = "Paris SG";
  localScore = "7";

  visitorLogo = "https://media.api-sports.io/football/teams/9244.png";
  visitorTeam = "Paris SG"
  visitorScore = "1";

  statutMatch = "En cours"
  durationMatch = "13\""
  matchTime = "aa";

  ngOnInit(): void {
        
  }

  
  
  sendRequest() {
    /*  const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');

      return this.http
        .get(this.url, { headers: headers })
        .subscribe(res => res); */
  }       
  
  
}
