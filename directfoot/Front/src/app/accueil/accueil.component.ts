import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit {

  readonly ROOT_URL = "https://v3.football.api-sports.io";

  constructor(private apiService: ApiService, private http: HttpClient , public datepipe: DatePipe ) {
  }

  ligueDefault = "61"

  mesMatch:any = null;

  ngOnInit(): void {
    this.getData();
  }
  
  /**
   * Recuperer les 10 derniers matchs d'une ligue
   * @param leagueID 
   */
  getData(){
    this.apiService.sendRequest( '/fixtures?league='+ this.ligueDefault +'&season=2020&last=10' ).subscribe( res => {
      this.mesMatch =  JSON.parse( res );
      console.log(this.mesMatch);
    })
  }

}