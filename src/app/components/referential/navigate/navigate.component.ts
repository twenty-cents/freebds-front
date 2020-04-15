import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

import { BreadcrumbMainService } from '../../../services/commons/breadcrumb-main.service';
import { SeriesService } from '../../../services/bds/series.service';
import { AuthorsService } from '../../../services/bds/authors.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  context: string = 'referential';
  letterSerie: string = 'A';
  letterAuthor: string = 'A';

  constructor(
    private breadcrumbMainService: BreadcrumbMainService,
    private serieService: SeriesService,
    private authorService: AuthorsService
  ) { }

  ngOnInit(): void {
    // Init breacrumb
    let item: MenuItem = {label: 'Encyclopédie', routerLink: ['referential/series-letters']};
    this.breadcrumbMainService.initialize(item);
    item = {label: 'Navigation libre', routerLink: ['referential/series-letters']};
    this.breadcrumbMainService.add(item);
  }

  handleLetterBySerie(event, letter:string) {
    this.letterSerie = letter;
  }

  handleLetterByAuthor(event, letter:string) {
    this.letterAuthor = letter;
  }
}
