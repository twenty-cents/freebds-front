import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Input } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import {MenuItem} from 'primeng/api';

import { BreadcrumbMainService } from '../../../services/commons/breadcrumb-main.service';
import { SeriesService } from '../../../services/bds/series.service';
import { FreeSearchFilters } from '../../../models/bds/free-search/free-search-filters';
import { SeriesListPager } from '../../../models/bds/series/series-list-pager';
import { Serie } from '../../../models/bds/series/serie';
import { PagerParams } from '../../../models/commons/pager-params';


@Component({
  selector: 'app-series-table',
  templateUrl: './series-table.component.html',
  styleUrls: ['./series-table.component.css']
})
export class SeriesTableComponent implements AfterViewInit {

  @Input() source: string;

  displayedColumns: string[] = ['id', 'title', 'categories', 'status', 'origin', 'action'];
  resultsLength = 0;
  pageSize: number = 100;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  freeSearchFilters: FreeSearchFilters;

  serieToDisplay: Serie;
  series: Serie[] = [];

  constructor(
    private seriesService: SeriesService,
    private breadcrumbMainService: BreadcrumbMainService,
  ) {
  }

  ngAfterViewInit() {

    // Init breacrumb
    let item: MenuItem = { label: 'Résultats', routerLink: ['series'] };
    this.breadcrumbMainService.add(item);

    this.freeSearchFilters = this.seriesService.freeSearchFilters;

    //this.paginate(0);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.seriesService.freeSearchBySeries(this.freeSearchFilters, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active + ',' + this.sort.direction)
        }),
        //return this.exampleDatabase!.getRepoIssues(
        //  this.sort.active, this.sort.direction, this.paginator.pageIndex);
        //}),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          this.series = data.content;
          return data.content;
        }),
        catchError(() => {
          console.log('in error');
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.series = data;
      });

  }

  displaySerie(serie: Serie) {
    console.log("to emit=" + serie.title);
    this.serieToDisplay = serie;
  }

  onNotify() {

  }
}
