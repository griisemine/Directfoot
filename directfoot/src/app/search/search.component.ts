import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  statut = false
  text = ""
  teamList:Array<Responses> = []
  matchResultat:Array<Search> = []

  ngOnInit(): void {
    this.envoyerRequete()
  }

  print(event: any){
    this.checkString(event.target.value)
    if ( event.target.value.length > 0 )
      this.statut = true
    else 
      this.statut = false
  }

  checkString(chaine:string){
    this.matchResultat.length = 0;
    for( var i = 0 ; i < this.teamList.length ; i++ ){
      if( this.teamList[i].teams.away.name.toLowerCase().indexOf(chaine.toLowerCase()) != -1 ){
        if( this.findinMatchResultat( this.teamList[i].teams.away.name ) == false )
          this.matchResultat.push( { logo:this.teamList[i].teams.away.logo , name:this.teamList[i].teams.away.name , id:this.teamList[i].teams.away.id} );
      }
      if( this.teamList[i].teams.home.name.toLowerCase().indexOf(chaine.toLowerCase()) != -1 ){
        if( this.findinMatchResultat( this.teamList[i].teams.home.name ) == false )
          this.matchResultat.push( { logo:this.teamList[i].teams.home.logo , name:this.teamList[i].teams.home.name  , id:this.teamList[i].teams.home.id} );
      }
    }
    this.matchResultat = Array.from(this.matchResultat)
  }

  findinMatchResultat(uneChaine:string): boolean{
    for( var i = 0 ; i < this.matchResultat.length ; i++ ){
      if( this.matchResultat[i].name == uneChaine )
        return true;
    }
    return false;
  }


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
        this.http.get('https://samymahi.eu/accueil.json' , {  responseType: 'text' } ).subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    }
  
    /**
     * Methode qui permet de parser les donnees recu
     * dans une interface du type Content
     * appliquer directement ces information dans le 
     * html
     * @param data jeu de donnee recu
     */
    dataParser( data:Content ){
      this.teamList = data.response
    }
}


interface Search {
  logo:string,
  name:string,
  id:string
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