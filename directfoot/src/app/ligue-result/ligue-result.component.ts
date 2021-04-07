import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ligue-result',
  templateUrl: './ligue-result.component.html',
  styleUrls: ['./ligue-result.component.css']
})
export class LigueResultComponent implements OnInit {

  readonly ROOT_URL = "https://v3.football.api-sports.io";

  @Input() ligueID!: number;
  data!: Content;
  standings: Array<Standings> = [];
  tabInt: Array<number> = [];
  ligueName = ""
  season = ""

  constructor(private http: HttpClient , private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.ligueID == null)
        this.ligueID = params['id'];
    });
   }
  
  ngOnInit(): void {
    // Exceuter au chargement de la page
    if ( this.ligueID != null ){
      this.envoyerRequete( '/standings?league=' + this.ligueID + '&season=2020' );
    }
  }

  /**
   * Methode qui permet de parser les donnees recu
   * dans une interface du type Content
   * appliquer directement ces information dans le 
   * html
   * @param data jeu de donnee recu
   */
  dataParser( data:Content ){
    // Parser si on a des resultat uniquement
    if ( data.results > 0 ){
      this.season = data.response[0].league.season;
      this.ligueName = data.response[0].league.name ;
      for( var i=0 ; i < data.response[0].league.standings[0].length ; i++ ){
        this.standings[i] = data.response[0].league.standings[0][i];
        this.tabInt[i] = i;
      }
    }
  }

  /**
   * Methode qui permet d'envoyer la requete
   * au serveur avec les parametre voulu
   * @param params les parametres de la requete
   */
     envoyerRequete ( params:string ){
      const headers = new HttpHeaders()
        .set('x-rapidapi-host', 'v3.football.api-sports.io')
        .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
        
      this.http.get(this.ROOT_URL + params ,{ headers , responseType: 'text' } )
              .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
              
     // this.http.get('https://samymahi.eu/ligue.json' ,{  responseType: 'text' } )
     //         .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    }

}


interface Content {
  get:string;
  response:Array<Responses>;
  results:number;
}

interface Responses {
  league:{
      id:string,
      name:string,
      country:string,
      logo:string,
      flag:string,
      season:string,
      standings:Array<Array<Standings>>
  }
}

interface Standings {
  rank:string,
  team:{
    id:string,
    name:string,
    logo:string
  }
  points:string,
  goalsDiff:string,
  group:string,
  form:string,
  status:string,
  description:string,
  all:{
    played:string,
    win:string,
    draw:string,
    lose:string,
    goals:{
      for:string,
      against:string
    }
  }
}