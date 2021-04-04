import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ligue-detail',
  templateUrl: './ligue-detail.component.html',
  styleUrls: ['./ligue-detail.component.css']
})
export class LigueDetailComponent implements OnInit {

  constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {
    console.log( this.route.snapshot.params.myParam );
  }

}
