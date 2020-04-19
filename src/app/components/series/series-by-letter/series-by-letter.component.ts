import { Component, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Input } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { SeriesService } from '../../../services/bds/series.service';
import { SeriesListPager } from '../../../models/bds/series/series-list-pager';
import { Serie } from '../../../models/bds/series/serie';

@Component({
  selector: 'app-series-by-letter',
  templateUrl: './series-by-letter.component.html',
  styleUrls: ['./series-by-letter.component.css']
})
export class SeriesByLetterComponent implements AfterViewInit {

  // Context : referential or collection
  @Input() context: string;
  // Starting series starting title letter to load 
  @Input() letter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'title', 'categories', 'status', 'origin', 'action'];
  resultsLength = 0;
  pageSize: number = 500;
  isLoadingResults = true;

  serieToDisplay: Serie;
  series: Serie[] = [];

  constructor(
    private seriesService: SeriesService
  ) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.load();
  }

  load(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.seriesService.getSeriesByLetter(this.context, this.letter, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active + ',' + this.sort.direction)
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          this.series = data.content;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.series = data;
      });
  }

  ngOnChanges(change: SimpleChange) {
    if(change['context'] != undefined){
      this.context = change['context'].currentValue;
    }

    if(change['letter'] != undefined) {
      let letter: string = change['letter'].currentValue;
      if(letter != undefined && change['letter'].firstChange != true) {
        this.letter = letter;
        this.load();
      }
    }

  }


}
