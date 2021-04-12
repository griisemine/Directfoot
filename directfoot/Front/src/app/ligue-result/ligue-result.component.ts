import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ligue-result',
  templateUrl: './ligue-result.component.html',
  styleUrls: ['./ligue-result.component.css']
})
export class LigueResultComponent implements OnInit {

  @Input() ligueID!: string;
  mesDonnes:any;

  constructor(private apiService: ApiService, private http: HttpClient , private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.ligueID == null)
        this.ligueID = params['id'];
    });
   }
  
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Recuperer les donnes d'une league
   */
  getData(){
    this.apiService.sendRequest('/standings?league=' + this.ligueID + '&season=2020').subscribe( data => {
      this.mesDonnes = JSON.parse(data);
    });
  }

}
