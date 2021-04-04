import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligue-cell',
  templateUrl: './ligue-cell.component.html',
  styleUrls: ['./ligue-cell.component.css']
})
export class LigueCellComponent implements OnInit {

  @Input() standing!:Standings

  rank = "1";
  logo = "https://media.api-sports.io/football/teams/9244.png"
  name = "Paris SG"
  id = ""
  points = "65"
  played = "30"
  win = "30"
  draw = "0"
  lose = "0"
  for = "78"
  against = "3"
  goalsDiff = "75"
  constructor() {   }

  ngOnInit(): void {
    this.rank = this.standing.rank;
    this.logo = this.standing.team.logo;
    this.name = this.standing.team.name;
    this.id = this.standing.team.id;
    this.points = this.standing.points;
    this.played = this.standing.all.played;
    this.win = this.standing.all.win;
    this.draw = this.standing.all.draw;
    this.lose = this.standing.all.lose;
    this.for = this.standing.all.goals.for;
    this.against = this.standing.all.goals.against;
    this.goalsDiff = this.standing.goalsDiff;
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