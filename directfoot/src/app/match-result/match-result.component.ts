import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.css']
})

export class MatchResultComponent implements OnInit {

  readonly ROOT_URL = "https://v3.football.api-sports.io"

  constructor(private http: HttpClient ,  public datepipe: DatePipe) {
    
  }
  @Input() data!: Responses;
  
  homeLogo = ""
  homeName = ""
  homeScore = ""

  awayLogo = ""
  awayName = ""
  awayScore = ""

  elapsed= "";
  statut = ""


  ngOnInit(): void {
    console.log(this.data);
    this.homeLogo = this.data.teams.home.logo
    this.homeName = this.data.teams.home.name
    this.homeScore = this.data.goals.home

    this.awayLogo = this.data.teams.away.logo
    this.awayName = this.data.teams.away.name
    this.awayScore = this.data.goals.away
    
    this.statut = this.data.fixture.status.long
    this.elapsed = this.data.fixture.status.elapsed

    if (this.statut == "Match Finished") {
      this.statut = "Terminé"
      this.elapsed = this.datepipe.transform(this.data.fixture.date, 'dd/MM/yy') || ""
    } else if (this.statut == "Not Started") {
      this.statut = "À Venir"
      this.elapsed = this.datepipe.transform(this.data.fixture.date, 'dd/MM/yy') || ""
    } else if (this.statut == "Time to be defined") {
      this.statut = "À Définir"
      this.elapsed = "-"
    } else {
      this.elapsed += "\"";
    }

  }     

  sendRequest (){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');

    this.http.get(this.ROOT_URL + '/fixtures?league=61&season=2019&round=Regular Season - 1' ,{ headers , responseType: 'text' } )
            .subscribe( data =>   JSON.parse(data)  );

  }

  
  
}

interface Content {
  get:string;
  response:Array<Responses>;
  results:number;
}

interface Responses {
  fixture:{
    date:string,
    id:number,
    status:{
      long:string,
      elapsed:string
    }

  },
  goals:{
    away:string,
    home:string
  },
  teams:{
    away:{
      id:string,
      logo:string,
      name:string,
      winner:string
    },
    home:{
      id:string,
      logo:string,
      name:string,
      winner:string
    }
  }
}