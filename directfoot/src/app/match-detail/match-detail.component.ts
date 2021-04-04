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
  response!:Array<Responses>;

  readonly ROOT_URL = "https://v3.football.api-sports.io";
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.fixtureID = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.fixtureID != "") {
      this.sendRequest()
    }
  }


  sendRequest(){
    const headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'b21eb12292b3695485d39ea23412ffab');
      
    this.http.get(this.ROOT_URL + '/fixtures/statistics?fixture=' + this.fixtureID ,{ headers , responseType: 'text' } )
            .subscribe( data =>  this.dataParser( JSON.parse(data) )  );
    
  }

  dataParser( data:Content ){
    this.response = data.response

    for( var i=0 ; i < data.response[0].statistics.length ; i++ ){
      this.response[0].statistics[0].type
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

}

interface Content {
  get:string;
  response:Array<Responses>;
  results:number;
}

interface Responses {
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