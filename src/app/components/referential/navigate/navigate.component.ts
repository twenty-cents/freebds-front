import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { MenuItem } from 'primeng/api';

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
    private route: ActivatedRoute,
    private breadcrumbMainService: BreadcrumbMainService,
    private serieService: SeriesService,
    private authorService: AuthorsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.context = params.get('context');

      if (this.context == 'referential') {
        // Init breacrumb referential
        let item: MenuItem = { label: 'Encyclopédie', routerLink: ['navigate', 'referential'] };
        this.breadcrumbMainService.initialize(item);
        item = { label: 'Navigation libre', routerLink: ['navigate', 'referential'] };
        this.breadcrumbMainService.add(item);
      } else {
        // Init breacrumb collection
        let item: MenuItem = { label: 'Ma Collection', routerLink: ['navigate', 'library'] };
        this.breadcrumbMainService.initialize(item);
        item = { label: 'Navigation libre', routerLink: ['navigate', 'library'] };
        this.breadcrumbMainService.add(item);
      }
    });


  }

  handleLetterBySerie(event, letter: string) {
    this.letterSerie = letter;
  }

  handleLetterByAuthor(event, letter: string) {
    this.letterAuthor = letter;
  }
}
