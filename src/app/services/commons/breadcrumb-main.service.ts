import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import {MenuItem} from 'primeng/api';

import { BreadcrumbItem } from '../../models/commons/breadcrumb-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbMainService {

  items: MenuItem[] = [];

  breadcrumbSubject: Subject<MenuItem[]> = new Subject();

  constructor(private router: Router,) { }

  initialize(item: MenuItem): void {
    this.items = [];
    this.items.push(item);
    this.breadcrumbSubject.next(this.items);
  }

  add(item: MenuItem): void {
    let found: boolean = false;
    for(var i = this.items.length -1; i >= 0 ; i--) {

      if(this.items[i].label == item.label) {
        found = true;
        break;
      }
    }
    if(found === false){
      this.items.push(item);
      this.breadcrumbSubject.next(this.items);
    }
  }

  select(item: MenuItem): void {
    let found: boolean = false;
    for(var i = this.items.length -1; i >= 0 ; i--) {

      if(this.items[i].label == item.label) {
        found = true;
        this.items.pop();
        break;
      } else {
        this.items.pop();
      }
    }

    if(found && item.routerLink != undefined) {
      this.router.navigate(item.routerLink);
    }
  }

  removeLast(): void {
    this.items.pop();
    this.breadcrumbSubject.next(this.items);
  }
}

