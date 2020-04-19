import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard/dashboard.component';
import { FreeSearchFiltersComponent } from '../components/referential/free-search/free-search-filters/free-search-filters.component';
import { NavigateComponent } from '../components/referential/navigate/navigate.component';
import { SeriesTableComponent } from '../components/series/series-table/series-table.component';
import { SerieItemComponent } from '../components/series/serie-item/serie-item.component';
import { SeriesByLetterComponent } from '../components/series/series-by-letter/series-by-letter.component';
import { AuthorItemComponent } from '../components/authors/author-item/author-item.component';
import { AuthorsTableComponent } from '../components/authors/authors-table/authors-table.component';

import { GraphicNovelsTableComponent } from '../components/graphic-novels/graphic-novels-table/graphic-novels-table.component';
import { GraphicNovelPageComponent } from '../components/graphic-novels/graphic-novel-page/graphic-novel-page.component';

import { LoginComponent } from '../components/security/login/login.component';
import { RegisterComponent } from '../components/security/register/register.component';
import { ProfileComponent } from '../components/security/profile/profile.component';
import { HomeComponent } from '../components/home/home.component';

const appRouteList: Routes = [
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'free-search/:context', component: FreeSearchFiltersComponent }, 
  { path: 'series/:context', component: SeriesTableComponent }, 
  { path: 'series/:serie.id/:context', component: SerieItemComponent }, 
  { path: 'navigate/:context', component: NavigateComponent }, 
  { path: 'authors/:context', component: AuthorsTableComponent }, 
  { path: 'authors/:author.id', component: AuthorItemComponent }, 
  { path: 'graphic-novels/:context', component: GraphicNovelsTableComponent }, 
  { path: 'graphic-novels/:graphicNovel.id', component: GraphicNovelPageComponent }, 

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
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
