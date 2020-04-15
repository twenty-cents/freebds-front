import { Component, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Input } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { AuthorsService } from '../../../services/bds/authors.service';
import { AuthorsListPager } from '../../../models/bds/authors/authors-list-pager';
import { Author } from '../../../models/bds/authors/author';

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

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'nickname', 'nationality', 'action'];
  resultsLength = 0;
  pageSize: number = 500;
  isLoadingResults = true;

  authorToDisplay: Author;
  authors: Author[] = [];

  constructor(
    private authorsService: AuthorsService
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
          return this.authorsService.getAuthorsByLetter(this.letter, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active + ',' + this.sort.direction)
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
    console.log(change);
    let letter: string = change['letter'].currentValue;
    if(letter != undefined && change['letter'].firstChange != true) {
      this.letter = letter;
      this.load();
    }
  }

}
