import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { PagerParams } from '../../../models/commons/pager-params';

@Component({
  selector: 'app-my-paginator',
  templateUrl: './my-paginator.component.html',
  styleUrls: ['./my-paginator.component.css']
})
export class MyPaginatorComponent implements OnInit {

  // Pager parameters
  @Input() pagerParams: PagerParams;
  
  // Pager action event to emit to the parent component
  @Output() notifyPagination = new EventEmitter<number>();

  // Pager  
  pager: {
    active: boolean,
    first: number,
    prev: number,
    next: number,
    last: number,
    currentPage: number,
    pages: number,
    rows: number,
    offset: number,
    lastOffset: number,
    size: number,
    views: number[], 
    displayedPage: string,
    sort: {
      criteria: string,
      direction: string
    }
  };

  constructor() {
    // Default values
    this.pager = {
      active : false,
      first : 1,
      prev : 1,
      next : 1,
      last : 1,
      currentPage: 1,
      pages : 0,
      rows : 0,
      offset : 0,
      lastOffset : 0,
      size : 0,
      views : [],
      displayedPage: '',
      sort: {
        criteria : undefined,
        direction : undefined 
      }
    };
  }

  ngOnInit() {
  }

  /**
   * Get pager changes from tge parent component
   * 
   * @param change
   */
  ngOnChanges(change: SimpleChange) {
    // Get changes
    let currentPager: PagerParams;

    currentPager = {
      currentPage : change['pagerParams'].currentValue.currentPage,
      totalPages : change['pagerParams'].currentValue.totalPages,
      pageTotalElements : change['pagerParams'].currentValue.pageTotalElements,
      totalElements : change['pagerParams'].currentValue.totalElements,
      size : change['pagerParams'].currentValue.size
    }
    
    // Report new values in the pager
    this.refreshPaginator(currentPager.currentPage, currentPager.pageTotalElements, currentPager.totalPages, currentPager.totalElements, currentPager.size );
  }

  /**
   * Reset Pager default values
   */
  private initPager() {
    this.pager.active = true;
    this.pager.first = 1;
    this.pager.prev = 1;
    this.pager.next = 1;
    this.pager.last = 1;
    this.pager.currentPage = 1;
    this.pager.pages = 0;
    this.pager.rows = 0;
    this.pager.offset = 0;
    this.pager.lastOffset = 0;
    this.pager.size = 0;
    this.pager.views = [];
    this.pager.displayedPage = '';
    this.pager.sort.criteria = undefined;
    this.pager.sort.direction = undefined; 
  }

  /**
   * Report pager changes in the pager
   * 
   * @param currentPage 
   * @param pageTotalElements 
   * @param totalPages 
   * @param totalElements 
   * @param size 
   */
  refreshPaginator(currentPage: number, pageTotalElements: number, totalPages: number, totalElements: number, size: number ) {
    if(pageTotalElements == 0) { // this.series.length
      this.initPager();
    }

    if(pageTotalElements > 0) { // this.series.length
      this.pager.active = true;
      this.pager.currentPage = currentPage + 1; // dataList.number + 1;
      this.pager.pages = totalPages; // dataList.totalPages;
      this.pager.first = 1;
      this.pager.last = this.pager.pages;
      this.pager.rows = totalElements; // dataList.totalElements;
      this.pager.size = size; // dataList.size;

      this.pager.prev = this.pager.currentPage - 1;
      if(this.pager.prev < 1){
        this.pager.prev = 1;
      }

      this.pager.next = this.pager.currentPage + 1;
      if(this.pager.next > this.pager.pages){
        this.pager.next = this.pager.pages;
      }
      
      if(this.pager.currentPage !== 1){
        this.pager.offset = (this.pager.currentPage - 1 ) * this.pager.size;
      } else {
        this.pager.offset = 1;
      }
      
      if(this.pager.currentPage !== 1){
        this.pager.lastOffset = this.pager.offset + this.pager.size;
      } else {
        this.pager.lastOffset = this.pager.size;
      }

      if(this.pager.currentPage === this.pager.last) {
        this.pager.lastOffset = this.pager.rows;
      }

      if(this.pager.views.length > 0 && this.pager.pages >= 3){
        if(this.pager.currentPage > 2) {
          this.pager.views = [this.pager.currentPage - 1, this.pager.currentPage];
          if(this.pager.currentPage < this.pager.pages) {
            this.pager.views.push(this.pager.currentPage + 1);
          }
        } else {
          this.pager.views = [1, 2, 3];
        }
      }

      if(this.pager.views.length === 0 && this.pager.pages >= 3) {
        this.pager.views = [1, 2, 3];
      }

      if(this.pager.views.length === 0 && this.pager.pages === 2) {
        this.pager.views = [1, 2];
      }

      if(this.pager.views.length === 0 && this.pager.pages === 1) {
        this.pager.views = [1];
      }

    }

    this.pager.displayedPage = "Affichage de " + this.pager.offset + " - " + this.pager.lastOffset + " sur "  + this.pager.rows;

  }

  /**
   * Propagate a page event to the parent component
   * 
   * @param pageNumber
   */
  paginate(pageNumber: number) {
    pageNumber--;
    this.notifyPagination.emit(pageNumber);
  }
}
