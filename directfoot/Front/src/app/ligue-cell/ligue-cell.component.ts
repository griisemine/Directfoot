import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligue-cell',
  templateUrl: './ligue-cell.component.html',
  styleUrls: ['./ligue-cell.component.css']
})
export class LigueCellComponent implements OnInit {

  @Input() standing!:any
  @Input() league!:String
  @Input() season!:String

  rank = "1";
  logo = "https://media.api-sports.io/football/teams/9244.png"
  name = "no_data"
  id = ""
  points = "-"
  played = "-"
  win = "-"
  draw = "-"
  lose = "-"
  for = "-"
  against = "-"
  goalsDiff = "-"
  constructor() {}

  ngOnInit(): void {
    this.parseStanding();
  }

  /**
   * Parser les donnees 
   * recu depuis une autre class
   */
  parseStanding(){
    if(this.standing != null){
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
}