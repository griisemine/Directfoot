import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ligue-detail',
  templateUrl: './ligue-detail.component.html',
  styleUrls: ['./ligue-detail.component.css']
})
export class LigueDetailComponent implements OnInit, OnChanges {

  data!:ContentLeague
  dataMatch!: Content
  rounds:Array<string> = [];
  tabInt: Array<number> = [];
  tabIntReponse: Array<number> = [];
  responses!: Array<Responses>;
  id = ""
  round = ""
  
  constructor( private apiService:ApiService ,private http: HttpClient, private activatedRoute: ActivatedRoute , private changeDetector: ChangeDetectorRef,private router:Router ) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.id = params['id'];
        console.log(params['id'])
        this.round = params['rounds'];
        console.log(params['rounds'])
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("CA CHANGE")
  }

  onChange(event:any){
    console.log(event.target.value)
    this.tabIntReponse = [];
    this.envoyerRequeteMatch(event.target.value)
    //this.router.navigate(['/league'],{ queryParams: { id:this.id, rounds:event.target.value} } );
  }

  ngOnInit(): void {
    console.log("ON INIT")
    this.envoyerRequete()
    if ( this.round == null )
      this.envoyerRequeteMatch("Regular Season - 1")
    else 
      this.envoyerRequeteMatch(this.round)
  }



  envoyerRequete( ){
    //const headers = new HttpHeaders()
    //  .set('x-rapidapi-host', 'v3.football.api-sports.io')
    //  .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
      
    //this.http.get(this.ROOT_URL + '/fixtures/statistics?fixture=' + this.fixtureID ,{ headers , responseType: 'text' } ).subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    //this.apiService.sendRequest( '/fixtures/statistics?fixture=' + this.fixtureID ).subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    this.http.get('https://samymahi.eu/rounds_list.json' ,{  responseType: 'text' } ).subscribe( data =>  this.dataParser( JSON.parse(data) )  );
  }
  dataParser( data:any ){
    for(var i = 0 ; i < data.response.length ; i++){
      this.tabInt[i] = i;
      this.rounds[i] = data.response[i]
    }
  }


    /**
   * Methode qui permet d'envoyer la requete
   * au serveur avec les parametre voulu
   * @param params les parametres de la requete
   */
     envoyerRequeteMatch (rounds:string){
      // const headers = new HttpHeaders()
      //  .set('x-rapidapi-host', 'v3.football.api-sports.io')
      //  .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');

   //   this.http.get("https://v3.football.api-sports.io/fixtures?league=" + this.id + "&season=2020&round=" + rounds ,{ headers , responseType: 'text' } ).subscribe( data =>  this.dataParserMatch( JSON.parse(data) )  );
      this.apiService.sendRequest( '/fixtures?league=' + this.id + "&season=2020&round=" + rounds ).subscribe( data =>  this.dataParserMatch( JSON.parse(data) )  );
    }
  
    /**
     * Methode qui permet de parser les donnees recu
     * dans une interface du type Content
     * appliquer directement ces information dans le 
     * html
     * @param data jeu de donnee recu
     */
    dataParserMatch( data:Content ){
      console.log(data)
      this.dataMatch = data
       for( var i=0 ; i < data.results ; i++ ){
        this.dataMatch.response[i] = data.response[i];
        this.tabIntReponse[i] = i;
      } 
    }


}

interface ContentLeague{
  get:string,
  results:number,
  response: Array<string>
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
}