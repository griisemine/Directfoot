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
    this.sendRequest();
  
  }

  data!: Content;
  
  sendRequest (){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
      
    this.http.get(this.ROOT_URL + '/fixtures?league=61&season=2020' ,{ headers , responseType: 'text' } )
            .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    
            
        /*    this.http.get(this.ROOT_URL + '/fixtures?date=' + this.datepipe.transform(new Date(), 'yyyy-MM-dd') || "" ,{ headers , responseType: 'text' } )
            .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    console.log(this.ROOT_URL + '/fixtures?date=' + this.datepipe.transform(new Date(), 'yyyy-MM-dd') || "" )
*/
  }

  dataParser( data:Content ){
    console.log(data);
    for( var i=0 ; i < data.results ; i++ ){
      this.responses[i] = data.response[i];
      console.log(data.response[i]);
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