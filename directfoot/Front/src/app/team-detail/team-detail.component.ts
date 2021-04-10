import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  teamID = ""
  leagueID = ""
  season = ""
  responses: any;
  tabInt: Array<number> = [];

  matchs:any;

  data!:any;
  readonly ROOT_URL = "https://v3.football.api-sports.io";
  constructor( private apiService: ApiService, private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.teamID = params['id'];
        this.leagueID = params['league'];
        this.season = params['season'];
    });
  }

  ngOnInit(): void {
    if( this.teamID.length > 0 && this.leagueID.length > 0 && this.season.length > 0 ){
      this.apiService.sendRequest( '/teams/statistics?league='+ this.leagueID + '&team='+ this.teamID + '&season=' + this.season ).subscribe( data =>  this.dataParser( JSON.parse(data) )  ); 
      this.apiService.sendRequest( '/fixtures?team='+ this.teamID + '&last=6' ).subscribe( data =>  this.matchs =  JSON.parse(data)   );
    }
  }

    /**
     * Methode qui permet de parser les donnees recu
     * dans une interface du type Content
     * appliquer directement ces information dans le 
     * html
     * @param data jeu de donnee recu
    */
    dataParser( data:any ){
      this.data = data
      data.response.team.name
      data.response.team.logo
    }

}