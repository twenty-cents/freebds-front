import { Component, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Input } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import {MenuItem} from 'primeng/api';

import { BreadcrumbMainService } from '../../../services/commons/breadcrumb-main.service';
import { FreeSearchService } from '../../../services/freeSearch/free-search.service';
import { FreeSearchFilters } from '../../../models/bds/free-search/free-search-filters';
import { Author } from '../../../models/bds/authors/author';
import { ResizeService } from '../../../services/commons/resize.service';
@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.css']
})
export class AuthorsTableComponent implements AfterViewInit {

  @Input() context: string;

  displayedColumns: string[];
  resultsLength = 0;
  pageSize: number = 100;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  freeSearchFilters: FreeSearchFilters;

  authorToDisplay: Author;
  authors: Author[] = [];

  constructor(
    private route: ActivatedRoute,
    private freeSearchService: FreeSearchService,
    private breadcrumbMainService: BreadcrumbMainService,
    private resizeService: ResizeService
  ) {
    // Set table size
    this.initDisplayColumns(this.resizeService.currentSize);
    // Subscribe for next screen size changes
    this.resizeService.onResize$.subscribe(size => {
      this.initDisplayColumns(size);
    });
  }

  initDisplayColumns(size: number): void {
    if(size < 2 ) {
      this.displayedColumns = ['xs-view'];
    } 
    
    if(size == 2 ) {
      this.displayedColumns = ['md-view'];
    }

    if(size > 2 ) {
      this.displayedColumns = ['id', 'lastname', 'firstname', 'nickname', 'nationality', 'action'];
    }
   }

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      this.context = params.get('context');
    // Init breacrumb
    let item: MenuItem = { label: 'Résultats', routerLink: ['authors'] };
    this.breadcrumbMainService.add(item);

    this.freeSearchFilters = this.freeSearchService.freeSearchFilters;

    //this.paginate(0);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.loadSeries();
    });
    
  }

  loadSeries() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.freeSearchService.searchAuthors(this.context, this.freeSearchFilters, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active + ',' + this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          this.authors = data.content;
          return data.content;
        }),
        catchError(() => {
          console.log('in error');
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.authors = data;
      });
    }

    ngOnChanges(change: SimpleChange) {
      if (change['context'] != undefined) {
        this.context = change['context'].currentValue;
      }
      this.loadSeries();
    }
  
    handleChangeListeView(view: string): void {
      if(view == 'list')
        this.initDisplayColumns(1);
      if(view == 'card')
        this.initDisplayColumns(2);
      if(view == 'table')
        this.initDisplayColumns(3);
    }
    
}
