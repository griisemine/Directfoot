import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  fixtureID = "";
  leagueID_1 = "";
  season_1 = "";
  leagueID_2 = "";
  season_2 = "2020";

  tabInt: Array<number> = [];
  response!:Array<any>;
  score = ["",""]

  playerList:Array<any> = []; 

  readonly ROOT_URL = "https://v3.football.api-sports.io";
  constructor(private apiService: ApiService, private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.fixtureID = params['id'];
    });
  }

  ngOnInit(): void {
    this.getData();
  }


  /**
   * Recuperer toute les donnees
   */
  getData(){
    if (this.fixtureID != "") {
      this.apiService.sendRequest('/fixtures/statistics?fixture=' + this.fixtureID ).subscribe( data =>  this.reqMatchDetailParser( JSON.parse(data) )  ); 
      this.apiService.sendRequest('/fixtures/lineups?fixture=' + this.fixtureID ).subscribe( data =>  this.reqMatchPlayerParser( JSON.parse(data) )  ); 
      this.apiService.sendRequest('/fixtures?id=' + this.fixtureID ).subscribe( data =>  this.reqMatchScoreParser( JSON.parse(data) )  ); 
    }
  }

  /**
   * parser les donnes pour le score des matchs
   * @param data 
   */
  reqMatchScoreParser( data:any ){
    console.log(data);
    this.leagueID_1 = data.response[0].league.id;
    this.leagueID_2 = data.response[1].league.id;
    this.score[0] = data.response[0].goals.home;
    this.score[1] = data.response[0].goals.away;
  }

  /**
   * parser les detail du match
   * @param data 
   */
  reqMatchDetailParser( data:any ){
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

  /**
   * parser les donnes des joueurs du match
   * @param data 
   */
  reqMatchPlayerParser( data:any ){
    console.log(data)
    this.playerList = data.response;
    this.playerList[0].startXI[0].player.name
  }
}
