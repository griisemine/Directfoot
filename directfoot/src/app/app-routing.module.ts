import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MatchDetailComponent } from './match-detail/match-detail.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LigueResultComponent } from './ligue-result/ligue-result.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { LigueDetailComponent } from './ligue-detail/ligue-detail.component';

export const appRouteList: Routes = [
  {
      path: '',
      component: AccueilComponent
  },
  {
      path: 'match',
      component: MatchDetailComponent
  },
  {
    path: 'league',
    component: LigueDetailComponent
  },
  {
    path: 'team',
      component: TeamDetailComponent
  }
  ,
  {
    path: 'ligue',
      component: LigueResultComponent
  }
  ,
  {
      path: '**',
      redirectTo: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRouteList)]
})

export class AppRoutingModule { }
