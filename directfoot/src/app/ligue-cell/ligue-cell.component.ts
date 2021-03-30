import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligue-cell',
  templateUrl: './ligue-cell.component.html',
  styleUrls: ['./ligue-cell.component.css']
})
export class LigueCellComponent implements OnInit {

  classement = 1;
  teamLogo = "https://media.api-sports.io/football/teams/9244.png"
  teamName = "Paris SG"
  teamPoint = 65
  teamDay = 30
  teamWin = 30
  teamNill = 0
  teamLose = 0
  teamBP = 78
  teamBC = 3
  teamDIF = 75
  constructor() {   }

  ngOnInit(): void {
  }

}
