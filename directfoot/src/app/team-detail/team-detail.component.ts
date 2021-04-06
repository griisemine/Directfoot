import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  teamID = ""
  readonly ROOT_URL = "https://v3.football.api-sports.io";
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.teamID = params['id'];
    });
  }

  ngOnInit(): void {
    console.log(this.teamID)
  }
  test!:Content

}


interface Content {
  get:string,
  results:number,
  response:Array<Statistique>
}

interface Statistique {
  league:{
    id:string,
    name:string,
    country:string,
    logo:string,
    flag:string,
    season:string
  },
  team:{
    id:string,
    name:string,
    logo:string
  },
  form:string,
  fixtures:{
    played:{
      home:string,
      away:string,
      total:string
    },
    wins:{
      home:string,
      away:string,
      total:string
    },
    draws:{
      home:string,
      away:string,
      total:string
    },
    loses:{
      home:string,
      away:string,
      total:string
    },
  },
  goals:{
    for:{
      total:{
        home:string,
        away:string,
        total:string
      },
      average:{
        home:string,
        away:string,
        total:string
      },
    },
  }

}