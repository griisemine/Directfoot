import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  fixtureID = "";

  tabInt: Array<number> = [];
  response!:Array<ResponsesMatchDetail>;
  score = ["",""]

  playerList:Array<ResponsesMatchPlayer> = []; 

  readonly ROOT_URL = "https://v3.football.api-sports.io";
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.fixtureID = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.fixtureID != "") {
      this.reqMatchDetail( this.fixtureID )
      this.reqPlayerMatch( this.fixtureID )
      this.reqMatchScore ( this.fixtureID )
    }
  }

  reqMatchScore(fixId:string){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
     this.http.get(this.ROOT_URL + '/fixtures?id=' + fixId ,{ headers , responseType: 'text' } ).subscribe( data =>  this.reqMatchScoreParser( JSON.parse(data) )  );
  }

  reqMatchScoreParser( data: ScoreContent ){
    console.log(data)
    this.score[0] = data.response[0].goals.home;
    this.score[1] = data.response[0].goals.away;
  }
  /**
   * Recuperer les details d'un match en particulier
   */
  reqMatchDetail(fixId:string){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
     this.http.get(this.ROOT_URL + '/fixtures/statistics?fixture=' + fixId ,{ headers , responseType: 'text' } ).subscribe( data =>  this.reqMatchDetailParser( JSON.parse(data) )  );
    //this.http.get('https://samymahi.eu/match.json' ,{  responseType: 'text' } ).subscribe( data =>  this.reqMatchDetailParser( JSON.parse(data) )  );
  }

  /**
   * Parser match detail
   * @param data 
   */
  reqMatchDetailParser( data:ContentMatchDetail ){
    this.response = data.response
    for( var i=0 ; i < data.response[0].statistics.length ; i++ ){
      this.tabInt[i] = i;
      if (this.response[0].statistics[i].value == null) {
        this.response[0].statistics[i].value = "0"
      }
      if (this.response[1].statistics[i].value == null ){
        this.response[1].statistics[i].value = "0"
      }
      this.response[0].team.id
    } 
  }

  reqPlayerMatch(fixId:string){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
    this.http.get(this.ROOT_URL + '/fixtures/lineups?fixture=' + fixId ,{ headers , responseType: 'text' } ).subscribe( data =>  this.reqMatchPlayerParser( JSON.parse(data) )  );
    //this.http.get('https://samymahi.eu/match-detail-player.json' ,{  responseType: 'text' } ).subscribe( data =>  this.reqMatchPlayerParser( JSON.parse(data) )  );
  }

  /**
   * Parser match player
   * @param data 
   */
  reqMatchPlayerParser( data:ContentMatchPlayer ){
    console.log(data)
    this.playerList = data.response;
    this.playerList[0].startXI[0].player.name
  }
}

interface ContentMatchDetail {
  get:string;
  response:Array<ResponsesMatchDetail>;
  results:number;
}

interface ResponsesMatchDetail {
  team:{
    id:string,
    name:string,
    logo:string
  },
  statistics:Array<Statistics>
}

interface Statistics {
  type:string,
  value:string
}



interface ContentMatchPlayer {
  get:string,
  results:number,
  response:Array<ResponsesMatchPlayer>
}

interface ResponsesMatchPlayer {
  team:{
    id:string,
    name:string,
    logo:string
  },
  coach:{
    id:string,
    name:string
  },
  formation:string,
  startXI:Array<Players>,
  substitutes:Array<Players>
}

interface Players {
  player:{
    id:string,
    name:string,
    number:string,
    pos:string
  }
}



interface ScoreContent {
  get:string;
  response:Array<{
    fixture:{
      date:string,
      id:number,
      status:{
        long:string,
        elapsed:string
      }
    },
    league:{
      id:string,
      name:string,
      country:string,
      logo:string,
      flag:string,
      season:string
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
  }>;
  results:number;
}