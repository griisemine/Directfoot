import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligue-result',
  templateUrl: './ligue-result.component.html',
  styleUrls: ['./ligue-result.component.css']
})
export class LigueResultComponent implements OnInit {

  readonly ROOT_URL = "https://v3.football.api-sports.io";
  constructor(private http: HttpClient ) { }

  @Input() ligueID!: number;

  ngOnInit(): void {
    //this.sendRequest();
  }

  data!: Content;
  standings: Array<Standings> = [];
  tabInt: Array<number> = [];
  
  sendRequest (){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
      
    this.http.get(this.ROOT_URL + '/standings?league=' + this.ligueID + '&season=2020' ,{ headers , responseType: 'text' } )
            .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    
  }

  dataParser( data:Content ){
    for( var i=0 ; i < data.response[0].league.standings[0].length ; i++ ){
      this.standings[i] = data.response[0].league.standings[0][i];
      console.log(data.response[0].league.standings[0][i]);
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