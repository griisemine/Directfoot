import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  readonly ROOT_URL = "https://v3.football.api-sports.io";

  constructor(private http: HttpClient , public datepipe: DatePipe ) {}

  responses: Array<Responses> = [];
  tabInt: Array<number> = [];
  caca ="caca pipi"

  ngOnInit(): void {
    this.envoyerRequete();
  }

  data!: Content;
  
  /**
   * Methode qui permet d'envoyer la requete
   * au serveur avec les parametre voulu
   * @param params les parametres de la requete
   */
  envoyerRequete (){
    /* 
     const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
    this.http.get(this.ROOT_URL + '/fixtures?league=61&season=2020' ,{ headers , responseType: 'text' } )
            .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    */

    //https://v3.football.api-sports.io/fixtures?league=61&season=2020&round=Regular Season - 32"
      this.http.get('https://samymahi.eu/accueil_current_saison.json' ,{  responseType: 'text' } )
            .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
  }

  /**
   * Methode qui permet de parser les donnees recu
   * dans une interface du type Content
   * appliquer directement ces information dans le 
   * html
   * @param data jeu de donnee recu
   */
  dataParser( data:Content ){
     for( var i=0 ; i < data.results ; i++ ){
      this.responses[i] = data.response[i];
      this.tabInt[i] = i;
    } 
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