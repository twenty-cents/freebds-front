import { Component, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Input } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { Serie } from '../../../models/bds/series/serie';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { PagerParams } from '../../../models/commons/pager-params';

@Component({
  selector: 'app-graphic-novels-list-m',
  templateUrl: './graphic-novels-list-m.component.html',
  styleUrls: ['./graphic-novels-list-m.component.css']
})
export class GraphicNovelsListMComponent implements AfterViewInit {

  @Input() context: string;
  @Input() serie: Serie;

  graphicNovels: GraphicNovel[];
  //pager: PagerParams;

  displayedColumns: string[] = ['title'];
  resultsLength = 0;
  pageSize: number = 20;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  constructor(private graphicNovelsService: GraphicNovelsService) {
  }

  ngAfterViewInit() {

    this.paginator.pageIndex = 0;

    this.graphicNovelsService.graphicNovelTableRefreshRequestedSubject.subscribe(data => {
      if(this.context != undefined) {
        this.loadSeries();
      }
    });

  }

  loadSeries() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.graphicNovelsService.getGraphicNovelsBySerie(this.context, this.serie.id, this.paginator.pageIndex, this.paginator.pageSize, "publicationDate,asc");
          //return this.freeSearchService.searchSeries(this.context, this.freeSearchFilters, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active + ',' + this.sort.direction);
          }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          this.graphicNovels = data.content;
          return data.content;
        }),
        catchError(() => {
          console.log('in error');
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.graphicNovels = data;
        // TODO : Force scroll to the top of the list
        var top = document.getElementById("top-gc").offsetTop;
        window.scrollTo(0, top);   
      });
  }

  ngOnChanges(change: SimpleChange) {
    if (change['context'] != undefined) {
      this.context = change['context'].currentValue;
    }

    if (change['serie'] != undefined) {
      this.serie = change['serie'].currentValue;
      if (this.serie.id != 0) {
        this.loadSeries();
      }
    }
  }


}
