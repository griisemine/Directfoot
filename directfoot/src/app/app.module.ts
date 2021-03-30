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

@NgModule({
  declarations: [
    AppComponent,
    MatchResultComponent,
    LigueResultComponent,
    LigueCellComponent,
    MatchDetailComponent
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
