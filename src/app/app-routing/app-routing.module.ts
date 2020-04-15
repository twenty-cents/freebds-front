import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard/dashboard.component';
import { FreeSearchManagerComponent } from '../components/referential/free-search/free-search-manager/free-search-manager.component';
import { NavigateComponent } from '../components/referential/navigate/navigate.component';
import { SeriesTableComponent } from '../components/series/series-table/series-table.component';
import { SerieItemComponent } from '../components/series/serie-item/serie-item.component';
import { SeriesByLetterComponent } from '../components/series/series-by-letter/series-by-letter.component';
import { AuthorItemComponent } from '../components/authors/author-item/author-item.component';

const appRouteList: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'referential/free-search',
    component: FreeSearchManagerComponent
  }, {
    path : 'series',
    component: SeriesTableComponent
  }, {
    path: 'series/:serie.id',
    component: SerieItemComponent
  }, {
    path: 'referential/navigate',
    component: NavigateComponent
  }, {
    path: 'authors/:author.id',
    component: AuthorItemComponent
  },

  {
      path: '**',
      redirectTo: 'DashboardComponent'
  }
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule
],
  imports: [
    RouterModule.forRoot(appRouteList),
    CommonModule
  ]
})
export class AppRoutingModule { }
