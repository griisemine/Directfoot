import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchResultComponent } from './match-result/match-result.component';
import { LigueResultComponent } from './ligue-result/ligue-result.component';
import { LigueCellComponent } from './ligue-cell/ligue-cell.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { SearchComponent } from './search/search.component';
import { LigueAccueilComponent } from './ligue-accueil/ligue-accueil.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchResultComponent,
    LigueResultComponent,
    LigueCellComponent,
    MatchDetailComponent,
    SearchComponent,
    LigueAccueilComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
