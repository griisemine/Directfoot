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
  

  refresh (){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');

    this.http.get(this.ROOT_URL + '/fixtures?last=1' ,{ headers , responseType: 'text' } )
            .subscribe( data =>  this.dataParser( JSON.parse(data) ) );

  }

  dataParser( data:Content ){
    //this.response = data.response
    this.statutMatch = data.get
    console.log(data.response[0])    
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

  response = ""

  ngOnInit(): void {
        
  }     
  
  
}

interface Content {
  get:string;
  response:Array<Responses>;
}

interface Responses {
  teams:Array<Teams>
}

interface Teams {
  away:Array<TeamsContent>
}

interface TeamsContent {
  id:string,
  logo:string,
  name:string,
  winner:string
}

/*
{
  away: {
    id:string,
    logo:string,
    name:string,
    winner:string
  };
  home:{
    id:string,
    logo:string,
    name:string,
    winner:string
  };*/