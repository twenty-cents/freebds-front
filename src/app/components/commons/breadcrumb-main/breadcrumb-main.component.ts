import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

import { BreadcrumbMainService } from '../../../services/commons/breadcrumb-main.service';

@Component({
  selector: 'app-breadcrumb-main',
  templateUrl: './breadcrumb-main.component.html',
  styleUrls: ['./breadcrumb-main.component.css']
})
export class BreadcrumbMainComponent implements OnInit {

  items: MenuItem[] = [];
  home: MenuItem;

  constructor(private breadcrumbMainService: BreadcrumbMainService) { }

  ngOnInit(): void {
    this.home = {icon: 'pi pi-home'};

    this.breadcrumbMainService.breadcrumbSubject.subscribe(items => {
      this.items = items;
    });
  }

  handleItemClick(event) {
    this.breadcrumbMainService.select(event.item)
  }
}
