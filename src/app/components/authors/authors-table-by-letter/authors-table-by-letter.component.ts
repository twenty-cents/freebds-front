import { Component, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Input } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { AuthorsService } from '../../../services/bds/authors.service';
import { AuthorsListPager } from '../../../models/bds/authors/authors-list-pager';
import { Author } from '../../../models/bds/authors/author';
import { ResizeService } from '../../../services/commons/resize.service';

@Component({
  selector: 'app-authors-table-by-letter',
  templateUrl: './authors-table-by-letter.component.html',
  styleUrls: ['./authors-table-by-letter.component.css']
})
export class AuthorsTableByLetterComponent implements AfterViewInit {

  // Context : referential or collection
  @Input() context: string;
  // Starting series starting title letter to load 
  @Input() letter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[];
  resultsLength = 0;
  pageSize: number = 100;
  isLoadingResults = true;

  authorToDisplay: Author;
  authors: Author[] = [];

  constructor(
    private authorsService: AuthorsService,
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
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.load();
    console.log('after init')
  }

  load(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.authorsService.getAuthorsByLetter(this.context, this.letter, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active + ',' + this.sort.direction)
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.authors = data;
      });
  }

  ngOnChanges(change: SimpleChange) {
    if(change['context'] != undefined){
      this.context = change['context'].currentValue;
      this.letter = 'A';
      console.log('ngchange')
      //this.load();
    }

    if(change['letter'] != undefined) {
      let letter: string = change['letter'].currentValue;
      if(letter != undefined && change['letter'].firstChange != true) {
        this.letter = letter;
        this.load();
      }
    }
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
